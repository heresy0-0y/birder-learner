import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";

const Bird = (props) => {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  const { img, name } = props;
  const fallback = (
    <Image
      ml="15%"
      mt="5%"
      w="90%"
      alt="bird placeholder png"
      h="90%"
      fit="contain"
      fallbackSrc="/bird-placeholder.png"
      filter={fallbackFilter}
    />
  );

  return (
    <Box
      borderWidth="2px"
      borderRadius="xl"
      padding="xl"
      h="xs"
      overflow="clip"
    >
      <Image
        src={img}
        h="100%"
        w="100%"
        fit="cover"
        align="75% 45%"
        alt={`image of ${name}`}
        fallback={fallback}
      />
    </Box>
  );
};

export default Bird;
