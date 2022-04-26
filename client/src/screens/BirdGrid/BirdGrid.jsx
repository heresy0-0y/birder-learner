import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, GridItem } from "@chakra-ui/react";
import { Bird } from "../../common/components";
import { fetchBirds, fetchLocation } from "../../common/services";
import {
  selectAllBirds,
  loadBirds,
} from "../../store/features/allBirds/allBirdsSlice.js";

export const BirdGrid = (props) => {
  const { isLoading } = useSelector((state) => state.allBirds);
  const dispatch = useDispatch();

  const birdies = useSelector(selectAllBirds);
  if (isLoading) {
    return <Box />;
  }

  const birds = birdies.map((bird) => (
    <GridItem mb="0.5rem" key={bird.key}>
      <Bird name={bird.scientificName} img={bird.media[0].identifier} />
    </GridItem>
  ));
  return (
    <Box
      h="90%"
      py="2rem"
      mx="2%"
      sx={{ columnCount: [1, 2, 3], columnGap: "0.5rem" }}>
      {birds}
    </Box>
  );
};
