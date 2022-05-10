import { Text, Box } from "@chakra-ui/react";
import Image from "next/image";

export const Footer = (props) => (
  <Box zIndex="1" position="relative" bottom="0">
    <Text noOfLines="1" w="100%" align="center">
      This app is built upon and inspired by the free and open source GBIF
      network and API
    </Text>
    <Text noOfLines="2" align="center">
      {" "}
      GBIF: The Global Biodiversity Information Facility (2022) What is GBIF?.
      Available from https://www.gbif.org/what-is-gbif [13 January 2020].
    </Text>
    <Image
      src="https://www.gbif.org/img/full_logo_white.svg"
      width="100"
      height="20"
    />
  </Box>
);
