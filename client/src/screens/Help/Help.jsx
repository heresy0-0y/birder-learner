import Image from "next/image";
import {
  Heading,
  Container,
  Text,
  Box,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
import birdSilhouette from "../../../public/0.5x-bird-silhouette.webp";

export default function (props) {
  return (
    <Flex align="center" direction="column">
      <Box w="sm" boxSize="3xs" position="relative" alignItems="center">
        <Image
          src={birdSilhouette}
          layout="fill"
          alt="sounds alive logo - silhouette of a hummingbird in a yellow-green gradient"
        />
      </Box>
      <Container my="10%">
        <Heading align="center" mb="5%">
          FAQs
        </Heading>
        <Text></Text>
      </Container>
    </Flex>
  );
}
