import React from "react";
import { Container, Nav, Footer } from "./components";

const CoreLayout = (props) => {
  return (
    <>
      <Nav />
      <Container>{props.children}</Container>
      <Footer />
    </>
  );
};

export default CoreLayout;
