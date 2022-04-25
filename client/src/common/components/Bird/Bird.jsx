import { Center, Box, Image, Text, useColorModeValue, Flex } from "@chakra-ui/react";

const Bird = (props) => {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  const { img, name } = props;
  const fallback = (
    <Image
      //  mt='auto'
      w="80%"
      alt="bird placeholder png"
      fallbackSrc="/bird-placeholder.png"
      fit="contain"
      filter={fallbackFilter}
    />
  );

  return (
    <Box
      borderWidth="2px"
      borderRadius="xl"
      overflow="clip"
    >
      <Image
        src={img}
        // h="100%"
        w="100%"
        fit="cover"
        // align="75% 25%"
        maxH='md'
        alt={`image of ${name}`}
        fallback={fallback}
      />
    </Box>
  );
};

export default Bird;
