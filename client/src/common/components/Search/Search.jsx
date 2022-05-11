import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  InputGroup,
  Button as CButton,
  Box,
  InputRightElement,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverAnchor,
} from "@chakra-ui/react";
import {
  useGetSuggestionsQuery,
  useGetCoordsQuery,
} from "../../services/autosuggest";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [skip, setSkip] = useState(true);
  const [skipSearch, setSearchSkip] = useState(true);
  const suggestContainer = useRef(null);
  const [searchText, setText] = useState("");
  const [searchRequest, setSearch] = useState("");
  const [coords, setCoords] = useState();
  const { data } = useGetSuggestionsQuery(searchText, { skip });
  const { data: location, isSuccess, isLoading } = useGetCoordsQuery(searchRequest, {
    skip: skipSearch,
  });

  useEffect(() => {

    if (location?.results) {
      console.log(location.results[0])
      setCoords(location.results[0].locations[0].latLng);
    }
  }, [location]);

  const handleSuggestSelect = (e) => {
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

  return (
    <Box w="100%">
      <InputGroup size="md" w="100%">
        <Popover isOpen={isOpen.toString()}>
          <PopoverAnchor>
            <Input pr=".5rem" value={searchText} onChange={handleChange} />
          </PopoverAnchor>

          <PopoverContent display={searchText.length >= 2 ? "flex" : "none"}>
            <PopoverBody>
              <List>
                {data?.results.map((result, index) => (
                  <ListItem
                    key={index}
                    onClick={handleSuggestSelect}
                    value={result.displayString}>
                    {result.displayString}
                  </ListItem>
                ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <InputRightElement width="4.5rem" ref={suggestContainer}>
          <CButton
            variant="outline"
            borderLeftRadius="0px"
            onClick={handleSearch}>
            Search
          </CButton>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Search;
