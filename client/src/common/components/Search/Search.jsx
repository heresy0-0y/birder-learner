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
  const { data, isLoading } = useGetSuggestionsQuery(searchText, { skip });
  const [coords, setCoords] = useState();
  const { data: location } = useGetCoordsQuery(searchRequest, { skip: skipSearch });
  const handleSuggestSelect = (e) => {
    setText(e.target.textContent);
  };

  useEffect(() => {
    if (searchText === "") {
      setSearchSkip(true);
    }
  }, [searchText]);


  const handleChange = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
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

          <PopoverContent
            display={
              data?.resourceSets[0].resources[0].value[0] ? "flex" : "none"
            }>
            <PopoverBody>
              <List>
                {data?.resourceSets[0].resources[0].value.map(
                  (result, index) => (
                    <ListItem
                      key={index}
                      onClick={handleSuggestSelect}
                      value={result.address.formattedAddress}>
                      {result.address.formattedAddress}
                    </ListItem>
                  )
                )}
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
