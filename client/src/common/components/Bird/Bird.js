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
    <Image align="center" fallbackSrc="/bird-placeholder.png" filter={fallbackFilter} />
  );

  return (
    <Box
      borderWidth="2px"
      borderRadius="xl"
      padding="xl"
      // h="3xs"
      h="xs"
      overflow="clip"
    >
      
        <Image
          // minH="100%"
          src={img}
          h="100%"
          w='100%'
          fit="cover"
          align="75% 45%"
          // padding="1rem"
          alt={`image of ${name}`}
          fallback={fallback}
          borderRadius="4%"
        />
        
    </Box>
  );
};
