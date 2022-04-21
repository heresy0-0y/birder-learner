import {
  Box,
  Flex,
  Badge,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import fetchBirds from "../../services/birds.js";

export const Bird = (props) => {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  const { img, name } = props;
  const fallback = (
    <Image fallbackSrc="/bird-placeholder.png" filter={fallbackFilter} />
  );

  return (
    <Box
      borderWidth="2px"
      borderRadius="xl"
      padding="xl"
      minH="fit-content"
      h="xs"
      overflow="clip"
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          align="center"
          borderRadius="full"
          h="2xs"
          w="90%"
          fit="cover"
          padding="1rem"
          fallback={fallback}
          src={img}
        />
        <Box w="80%" fontSize="1rem" textAlign="center">
          {name}
        </Box>
        <audio controls src=''/>
      </Flex>
    </Box>
  );
};
