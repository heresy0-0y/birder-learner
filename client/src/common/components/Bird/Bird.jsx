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
    <Box borderWidth="2px" borderRadius="xl" overflow="clip">
      <Image
        src={img}
        w="100%"
        fit="cover"
        maxH="md"
        alt={`image of ${name}`}
        fallback={fallback}
      />
    </Box>
  );
};

export default Bird;
