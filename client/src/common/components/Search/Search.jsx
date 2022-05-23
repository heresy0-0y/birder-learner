import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { MdLocationSearching, MdMyLocation } from "react-icons/md";
import {
  Input,
  InputGroup,
  Button as CButton,
  ButtonGroup,
  Box,
  InputRightElement,
  List,
  useColorMode,
  IconButton,
  ListItem,
  Popover,
  useBreakpointValue,
  useToast,
  PopoverContent,
  PopoverBody,
  PopoverAnchor,
} from "@chakra-ui/react";
import {
  useGetSuggestionsQuery,
  useGetCoordsQuery,
} from "../../services/autosuggest";
import {
  setLocation,
  selectIsFetching,
} from "../../../store/features/locationSlice";

const Search = () => {
  const toast = useToast()
  const [isOpen, setIsOpen] = useState(false);
  const [skip, setSkip] = useState(true);
  const [distance, setDistance] = useState("15");
  const [skipSearch, setSearchSkip] = useState(true);
  const suggestContainer = useRef(null);
  const [searchText, setText] = useState("");
  const [searchRequest, setSearch] = useState("");
  const [currentLocation, setCurrentLocation] = useState({
    icon: <MdLocationSearching />,
  });
  const [coords, setCoords] = useState();
  const searchBar = useRef(null);
  const router = useRouter();
  const { data } = useGetSuggestionsQuery(searchText, { skip });

  const isFetching = useSelector(selectIsFetching);

  const {
    data: location,
    isSuccess,
    isLoading,
  } = useGetCoordsQuery(searchRequest, {
    skip: skipSearch,
  });

  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const searchMarginTop = useBreakpointValue({ base: "3%", lg: "1%" });

  const bg = { light: "#ACC1DF", dark: "#13315A" };
  const color = { light: "#002A64", dark: "#C8FFBA" };
  const highlight = { light: "#acc1df88", dark: "#acc1df88" };

  useEffect(() => {
    if (location?.features) {
      const locationProps = location.features[0].properties;
      setCoords({ lat: locationProps.lat, lon: locationProps.lon });
    }
  }, [location]);

  useEffect(() => {
    if (coords) {
      const queryOptions = {
        coords: { lat: coords.lat, lng: coords.lon },
        distance: distance,
      };

      dispatch(setLocation(queryOptions));
      router.push(`/search/${JSON.stringify(queryOptions)}`);
    }
  }, [coords]);

  const handleSuggestSelect = (e) => {
    searchBar.current.focus();
    setText(e.target.textContent);
  };
  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length < 3) {
      setIsOpen(false);
      setSkip(true);
    } else {
      setSkip(false);
      setIsOpen(true);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        status: "error",
        title: "Error",
        description: "Sorry, your browser doesn't support geolocation!",
        isClosable: true,
      })
      console.log(navigator.geolocation)
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const geolocation = { lat: pos.coords.latitude, lon: pos.coords.longitude }
        setCoords(geolocation)
        console.log(geolocation)
      }, () => {
        toast({
          status: "error",
          title: "Error",
          description: "Hmm, we couldn't retrieve your location",
          isClosable: true,
        })
      })
      console.log(navigator.geolocation)
}
  }

  const handleSearch = () => {
    setSearch(searchText);
    setSearchSkip(false);
    setSkip(true);
    setText("");
  };

  const handleKBEnter = (e) => {
    e.key === "Enter" ? handleSearch() : null;
  };

  return (
    <Box w="100%" pt={searchMarginTop}>
      <InputGroup size="md">
        <Popover isOpen={isOpen.toString()} initialFocusRef={searchBar}>
          <PopoverAnchor>
            <Input
              placeholder="Search by locale (i.e. City, State, Country, etc.)"
              borderColor={color[colorMode]}
              pr="7rem"
              ref={searchBar}
              value={searchText}
              onChange={handleChange}
              onKeyDown={handleKBEnter}
            />
          </PopoverAnchor>

          <PopoverContent
            bg={bg[colorMode]}
            display={searchText.length >= 3? "flex" : "none"}
            mt="-1.5"
            w="100%"
            borderColor={color[colorMode]}
          >
            <PopoverBody>
              <List>
                {!data?.results[0] ? (
                  <ListItem>Hmm, no suggestions for this query...</ListItem>
                ) : null}

                {data?.results[0]
                  ? data?.results.map((result, index) => (
                      <ListItem key={index}>
                        <CButton
                          size="sm"
                          my="1%"
                          _focus={{ bg: `${highlight[colorMode]}` }}
                          _hover={{ bg: `${highlight[colorMode]}` }}
                          key={index}
                          variant="ghost"
                          onClick={handleSuggestSelect}
                          value={result.formatted}
                        >
                          {result.formatted}
                        </CButton>
                      </ListItem>
                    ))
                  : null}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <InputRightElement width="7rem" ref={suggestContainer}>
          <ButtonGroup isAttached w="7rem">
            <IconButton
                borderColor={color[colorMode]}
              icon={currentLocation.icon}
              variant="outline"
              _hover={{ bg: `${bg[colorMode]}` }}
              color={color[colorMode]}
              borderRight="none"
              onClick={handleCurrentLocation}
            />
            <CButton
                borderColor={color[colorMode]}
              _hover={{ bg: `${bg[colorMode]}` }}
              color={color[colorMode]}
              isLoading={isLoading || isFetching}
              variant="outline"
              onClick={handleSearch}
            >
              Search
            </CButton>
          </ButtonGroup>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Search;
