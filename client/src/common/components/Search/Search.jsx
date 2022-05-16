import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { setLocation } from "../../../store/features/locationSlice";

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
  const { data } = useGetSuggestionsQuery(searchText, { skip });
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

  const color = { light: "#002A64", dark: "#C8FFBA" };

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
    }
  }, [coords]);

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
      <InputGroup size="md" w="100%">
        <Popover isOpen={isOpen.toString()} initialFocusRef={searchBar}>
          <PopoverAnchor>
            <Input
              borderColor={color[colorMode]}
              pr=".5rem"
              ref={searchBar}
              value={searchText}
              onChange={handleChange}
              onKeyDown={handleKBEnter}
            />
          </PopoverAnchor>

          <PopoverContent
            display={searchText.length >= 2 ? "flex" : "none"}
            mt="-1.5"
            w="100%"
          >
            <PopoverBody>
              <List>
                {data?.results.map((result, index) => (
                  <ListItem>
                    <CButton
                      size="sm"
                      my="1%"
                      key={index}
                      onClick={handleSuggestSelect}
                      value={result.displayString}
                    >
                      {result.displayString}
                    </CButton>
                  </ListItem>
                ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <InputRightElement width="4.5rem" ref={suggestContainer}>
          <CButton
            color={color[colorMode]}
            h="95%"
            w="95%"
            isLoading={isLoading}
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
