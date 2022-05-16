import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  InputGroup,
  Button as CButton,
  Box,
  InputRightElement,
  List,
  useColorMode,
  ListItem,
  Popover,
  useBreakpointValue,
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
  const [isOpen, setIsOpen] = useState(false);
  const [skip, setSkip] = useState(true);
  const [distance, setDistance] = useState("15");
  const [skipSearch, setSearchSkip] = useState(true);
  const suggestContainer = useRef(null);
  const [searchText, setText] = useState("");
  const [searchRequest, setSearch] = useState("");
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
  const searchMarginTop = useBreakpointValue({ base: "3%", lg: "null" });

  const bg = { light: "#ACC1DF", dark: "#13315A" };
  const color = { light: "#002A64", dark: "#C8FFBA" };
  const highlight = { light: "#acc1df88", dark: "#acc1df88" };

  useEffect(() => {
    if (location?.results) {
      setCoords(location.results[0].locations[0].latLng);
    }
  }, [location]);

  useEffect(() => {
    if (coords) {
      const queryOptions = {
        coords: { lat: coords.lat, lng: coords.lng },
        distance: distance,
      };

      dispatch(setLocation(queryOptions));
      router.push(`/search/${JSON.stringify(queryOptions)}`);
    }
  }, [coords]);

  if (router.query.location) {
    if (router.asPath.includes("search")) {
      dispatch(setLocation(JSON.parse(router.query.location)));
    }
  }
  const handleSuggestSelect = (e) => {
    searchBar.current.focus();
    setText(e.target.textContent);
  };
  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length < 2) {
      setIsOpen(false);
      setSkip(true);
    } else {
      setSkip(false);
      setIsOpen(true);
    }
  };

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
    <Box w="90%" pt={searchMarginTop}>
      <InputGroup size="md">
        <Popover isOpen={isOpen.toString()} initialFocusRef={searchBar}>
          <PopoverAnchor>
            <Input
              borderColor={color[colorMode]}
              pr="4.5rem"
              ref={searchBar}
              value={searchText}
              onChange={handleChange}
              onKeyDown={handleKBEnter}
            />
          </PopoverAnchor>

          <PopoverContent
            bg={bg[colorMode]}
            display={searchText.length >= 2 ? "flex" : "none"}
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
                          value={result.displayString}
                        >
                          {result.displayString}
                        </CButton>
                      </ListItem>
                    ))
                  : null}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <InputRightElement width="4.5rem" ref={suggestContainer}>
          <CButton
            _hover={{ bg: `${bg[colorMode]}` }}
            _expanded={{ bg: `${highlight[colorMode]}` }}
            color={color[colorMode]}
            isLoading={isLoading || isFetching}
            variant="outline"
            borderLeftRadius="0px"
            border="none"
            onClick={handleSearch}
          >
            Search
          </CButton>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Search;
