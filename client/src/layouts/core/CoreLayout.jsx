import React from "react";
import { Container, Nav, Footer } from "./components";
import {useColorMode, Box} from '@chakra-ui/react'

const CoreLayout = (props) => {
  const { colorMode } = useColorMode();
  const opacity = { light: 0, dark: 0.5 };
  return (
    <>
     <Box w="100vw" h="100vh" bg="#676e95" opacity={opacity[colorMode]}  position="fixed" zIndex="-1">
          </Box>
      <Nav />
      <Container>{props.children}</Container>
      <Footer />
    </>
  );
};

export default CoreLayout;
