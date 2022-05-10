import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Nav, Footer } from "./components";
import { setCredentials } from "../../store/features/authSlice";

const CoreLayout = (props) => {
 
  return (
    <>
      <Container>
        <Nav />
        {props.children}
        <Footer/>
      </Container>
    </>
  );
};

export default CoreLayout;
