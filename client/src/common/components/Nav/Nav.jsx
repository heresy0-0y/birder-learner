import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Menu,
  Center,
  MenuList,
  Spacer,
  MenuButton,
  ButtonGroup,
  MenuItem,
  Button,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import {
  selectCurrentUser,
  setCredentials,
} from "../../../store/features/authSlice";

import Search from "../Search/Search";
const Nav = () => {
  const [localUser, setUser] = useState({ user: null, token: null });
  const dispatch = useDispatch();
  const searchLine = useBreakpointValue({ base: "" });
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
    <>
      <Flex
        direction="row"
        wrap="wrap"
        mt="0.7rem"
        px="0.7rem"
        w="100%"
        minW="100vw"
        align="center"
        justify="space-between"
        color={color[colorMode]}
      >
        <ButtonGroup isAttached display={{ base: "none", lg: "flex" }}>
          {links.map((link, index) => (
            <Button
              color={color[colorMode]}
              variant="ghost"
              onClick={() => router.push(link.url)}
              key={index}
            >
              {link.text}
            </Button>
          ))}
        </ButtonGroup>
        <Menu flex-basis="20%">
          {({ isOpen }) => (
            <>
              <MenuButton
                bg="hsla(210, 38%, 95%, 0.1)"
                display={{ base: "flex", lg: "none" }}
                isActive={isOpen}
                direction="row"
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {" "}
                Menu{" "}
              </MenuButton>
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
                display={user ? "flex" : "none"}
                isActive={isOpen}
                direction="row"
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {" "}
                {userGreeting}
              </MenuButton>
              <Box
                flexBasis="100%"
                display={currentPath.includes("search") ? "inherit" : "none"}
              >
                <Spacer />
                <Box w="70%">
                  <Search />
                </Box>
                <Spacer />
              </Box>
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
      </Flex>
    </>
  );
};

export default Nav;
