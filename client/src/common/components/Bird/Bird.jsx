import React from "react";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";

const Bird = (props) => {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  const { img, name } = props;
  const fallback = (
    <Image
      w="80%"
      alt="bird placeholder png"
      fallbackSrc="/bird-placeholder.png"
      fit="contain"
      filter={fallbackFilter}
    />
  );

  return (
    <Box mb="0.75rem" borderRadius="xl" overflow="hidden">
      <Image
        src={img}
        fit="cover"
        maxH="100%"
        w="100%"
        fallback={fallback}
        alt={`image of ${name}`}
      />
    </Box>
  );
};

export default Bird;
