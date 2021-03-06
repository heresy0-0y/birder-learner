import Image from "next/image";
import { Heading, Container, Text, Box, Flex } from "@chakra-ui/react";
import birdSilhouette from "../../../public/bird-silhouette.webp";

export default function (props) {
  return (
    <Flex direction="column" align="center">
      <Box w="3xs" position="relative" alignItems="center" my="5%">
        <Image
          src={birdSilhouette}
          layout="responsive"
          priority
          width="10%"
          height="5%"
          objectFit="contain"
          alt="sounds alive logo - silhouette of a hummingbird in a yellow-green gradient"
        />
      </Box>

      <Container zIndex={1}>
        <Heading align="center" mb="5%" size="lg">
          Welcome to Sounds Alive
        </Heading>
        <Text mt="5%" mb="3%" align="center">
          Thank you for stopping by. We have so much to share. Your city’s
          feathered denizens are waiting to meet you and sing you their songs.
        </Text>
        <Text align="center" mb="3%">
          Actually, you can introduce yourself to the local birds of any city in
          the world here! Thanks to the Global Biodiversity Information
          Facility, you’ll get to know your neighbors through images taken right
          in your area, taken by both professional researchers and citizen
          naturalists.
        </Text>
        <Text align="center">
          The wondrous planetary gift that is biodiversity is always blossoming,
          but our current climate crisis means not just birds, but all species
          need our help. What better way to start than by getting to know the
          critters that light up our everyday soundscapes and live their lives
          right outside our windows?
        </Text>
      </Container>

      <Box w="3xs" position="relative" alignItems="center" my="5%">
        <Image
          src={birdSilhouette}
          layout="responsive"
          priority
          width="10%"
          height="5%"
          objectFit="contain"
          style={{ transform: "scaleX(-1)" }}
          alt="sounds alive logo - silhouette of a hummingbird in a yellow-green gradient"
        />
      </Box>
    </Flex>
  );
}
