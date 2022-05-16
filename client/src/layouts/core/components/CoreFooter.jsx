import gbifLogo from "../../../../public/gbif_logo.svg";
import { Text, Box, useColorMode } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  const { colorMode } = useColorMode();

  const color = { light: "#002A64", dark: "#C8FFBA" };
  return (
    <Box
      zIndex="1"
      position="relative"
      bottom="0"
      color={color[colorMode]}
      my="2%"
      mx="5%"
    >
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
        src={gbifLogo}
        layout="responsive"
        width="50%"
        height="3%"
        alt="GBIF Logo - white"
      />
    </Box>
  );
};

export default Footer;
