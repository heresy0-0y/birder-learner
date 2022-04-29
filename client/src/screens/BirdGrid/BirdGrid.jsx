import React, { useState, useEffect } from "react";
import { Box, GridItem } from "@chakra-ui/react";
import { Bird, Link } from "../../common/components";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";

export const BirdGrid = (props) => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();

  if (isLoading) {
    return <Box />;
  }
  const birdies = data.results;
  const birds = birdies.map((bird) => (
    <Link url={`songs/${bird.key}`}>
      <Box key={bird.key}>
        <Bird name={bird.scientificName} img={bird.media[0].identifier} />
      </Box>
    </Link>
  ));
  return (
    <Box
      w="100vw"
      mb="0.75rem"
      px="1%"
      pt="1rem"
      sx={{
        columnCount: [1, 2, 3],
        columnGap: "0.75rem",
      }}>
      {birds}
    </Box>
  );
};
