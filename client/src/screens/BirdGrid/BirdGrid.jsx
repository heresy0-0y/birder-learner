import React, { useState, useEffect } from "react";
import { Box, GridItem } from "@chakra-ui/react";
import { Bird } from "../../common/components";
import {useGetBirdsByIPCountryCodeQuery} from '../../common/services/birds.js'

export const BirdGrid = (props) => {
  const {data, error, isLoading} = useGetBirdsByIPCountryCodeQuery()

  if (isLoading) {
    return <Box />;
  }
  const birdies = data.results
  const birds = birdies.map((bird) => (
    <GridItem  key={bird.key}  >
      <Bird name={bird.scientificName} img={bird.media[0].identifier} />
    </GridItem>
  ));
  return (
    <Box
      h="100%"
      py="2rem"
      mx="2%"
      sx={{ columnCount: [1, 2, 2, 2, 2, 3], columnGap: "0.75rem" }}>
      {birds}
    </Box>
  );
};
