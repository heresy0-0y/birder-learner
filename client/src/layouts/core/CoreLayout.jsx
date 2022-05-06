import React from "react";
import Image from 'next/image'
import {Box, Wrap} from "@chakra-ui/react"
import { Container, Nav } from "./components";

const CoreLayout = (props) => {
  return (
    <>
    <Container >
      <Nav />
      {props.children}
      
    </Container>
      </>
  );
};

export default CoreLayout;
