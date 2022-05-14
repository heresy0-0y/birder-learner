import React from "react";
import { Container, Nav, Footer } from "./components";
import { useColorMode, Box, Flex } from "@chakra-ui/react";

const CoreLayout = (props) => {
  const { colorMode } = useColorMode();
  const opacity = { light: 0.5, dark: 0.7 };
  const bgFilterColor = { light: "#ACC1DF", dark: "#13315A" };
  return (
    <Flex w="100%" h="100%" direction="column" align="center">
      <Nav />
      <Container>{props.children}</Container>
      <Footer />
      <Box
        top="0"
        left="0"
        right="0"
        position="fixed"
        w="100%"
        h="100%"
        bg={bgFilterColor[colorMode]}
        opacity={opacity[colorMode]}
        zIndex="-1"
      ></Box>
    </Flex>
  );
};

export default CoreLayout;
