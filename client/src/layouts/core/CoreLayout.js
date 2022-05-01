import React from "react";
import { VStack } from "@chakra-ui/react";
import { Container, DarkModeSwitch, Nav } from "./components";

const CoreLayout = (props) => {
  return (
    <Container>
      <Nav />
      <DarkModeSwitch />
      {props.children}
    </Container>
  );
};

export default CoreLayout;
