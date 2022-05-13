import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Menu,
  Center,
  MenuList,
  MenuButton,
  MenuItem,
  Button as CButton,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button } from "../Buttons/Button.jsx";
import {
  selectCurrentUser,
  setCredentials,
} from "../../../store/features/authSlice";

import Search from "../Search/Search";
const Nav = () => {
  const [localUser, setUser] = useState({ user: null, token: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const checkForSession = async () => {
      const localUserString = localStorage.getItem("user");
      const localUser = JSON.parse(localUserString);
      if (localUser !== null) {
        if (Object.keys(localUser).includes("user")) {
          setUser(localUser);
        }
      }
    };
    checkForSession();
  }, []);
  useEffect(() => {
    dispatch(setCredentials(localUser));
  }, [localUser, dispatch]);
  const { colorMode } = useColorMode();

  const color = { light: "#002A64", dark: "#C8FFBA" };
  const inputMargin = useBreakpointValue({
    base: "0.5rem",
    sm: "4rem",
    md: "7rem",
  });
  const router = useRouter();

  const currentPath = router.asPath;
  const user = useSelector(selectCurrentUser);
  const [userGreeting, setGreeting] = useState(null);
  const initialLinks = [
    { text: "Home", url: "/" },
    { text: "Sign Up", url: "/signup" },
    { text: "Log In", url: "/login" },
    { text: "Search", url: "/search" },
  ];
  const [links, setLinks] = useState(initialLinks);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setCredentials({ user: null, token: null }));
    router.push("/");
  };

  useEffect(() => {
    if (typeof user !== "string" && user) {
      setGreeting(`Hello, ${user.first_name}!`);
      setLinks((prev) =>
        [...prev].filter(
          (link) => link.text === "Home" || link.text === "Search"
        )
      );
    } else {
      setLinks(initialLinks);
    }
  }, [user]);

  return (
    <Box mt="0" w="100%" display="flex" color={color[colorMode]}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              bg="hsla(210, 38%, 95%, 0.1)"
              display={{ base: "flex", lg: "none" }}
              isActive={isOpen}
              direction="row"
              mt="0.5rem"
              ml="0.5rem"
              as={CButton}
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              {" "}
              Menu{" "}
            </MenuButton>
            <Center
              w="50%"
              ml={inputMargin}
              mt="0.5rem"
              display={
                currentPath.includes("search")
                  ? { base: "flex", lg: "none" }
                  : "none"
              }
            >
              <Search />
            </Center>
            <MenuList zIndex={2}>
              {links.map((link, index) => (
                <MenuItem onClick={() => router.push(link.url)} key={index}>
                  {link.text}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>{" "}
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              bg="hsla(210, 38%, 95%, 0.1)"
              position="absolute"
              display={user ? "flex" : "none"}
              isActive={isOpen}
              direction="row"
              right="0.5rem"
              mt="0.5rem"
              ml="0.5rem"
              as={CButton}
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              {" "}
              {userGreeting}
            </MenuButton>
            <MenuList zIndex={2}>
              <MenuItem
                onClick={() => router.push(`/${user.username}/favorites`)}
                key={"favorites"}
              >
                Favorites
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Flex
        mt="0.5rem"
        direction="row"
        w="100%"
        display={{ base: "none", lg: "flex" }}
      >
        {links.map((link, index) => (
          <Button text={link.text} url={link.url} key={index} />
        ))}

        <Box w="5%" />
        {currentPath.includes("search") ? <Search /> : null}
        <Box w="30%" />
      </Flex>
    </Box>
  );
};

export default Nav;
