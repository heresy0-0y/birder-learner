import React, { useState, useEffect } from "react";
import { MasonryInfiniteGrid as MasonryGrid } from "@egjs/react-infinitegrid";
import { Box, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Bird, Link } from "../../common/components";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";
import {useRouter} from 'next/router'
export const BirdGrid = (props) => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();

  
  const column = useBreakpointValue({base: '1', sm: 2, lg: '3', '2xl': 4})
  const width = useBreakpointValue({base: 'xs', xs: 'sm', sm: 'xs', md: 'sm', lg: 'xs', xl: 'sm', '2xl': 'md'})
  const gap = useBreakpointValue({base: 5, sm: 10, md: 10})
  if (isLoading) {
    return <Box />;
  }
  

    
    const birdies = data.results;
    const birds = birdies.map((bird) => (
      <Link url={`songs/${bird.taxonKey}`} className={"item"}>
      <Bird
        w={width}
        name={bird.scientificName}
        img={bird.media[0].identifier}
        key={bird.taxonKey}
        />
    </Link>
  ));


  return (
    <VStack 
    w='100vw'
    overflow='hidden'
    minH='100vh'
    // px='2%'
    >
    <Box  w='100vw'>
    <MasonryGrid
      className="container"
      column={column}
      align='center'
      gap={gap}
      width="100vw"
      resizeDebounce='0'
      >
      {birds}
    </MasonryGrid>
    </Box>
    </VStack>
  );
};

