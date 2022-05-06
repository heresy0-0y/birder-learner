import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Nav } from "./components";
import { setCredentials } from "../../store/features/authSlice";

const CoreLayout = (props) => {
  const [user, setUser] = useState({ user: null, token: null });
  const dispatch = useDispatch();
  useEffect(() => {
    const checkForSession = () => {
      const localUserString = localStorage.getItem("user");
      const localUser = JSON.parse(localUserString);
      if (
        typeof localUser === "object"
      ) {
        if ( Object.keys(localUser).includes("user")) {

          setUser(localUser);
        }
      }
    };
    checkForSession();
  }, []);
  useEffect(() => {
    dispatch(setCredentials(user));
  }, [user]);

  return (
    <>
      <Container>
        <Nav />
        {props.children}
      </Container>
    </>
  );
};

export default CoreLayout;
