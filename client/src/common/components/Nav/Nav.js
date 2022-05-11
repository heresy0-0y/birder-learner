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
  useColorMode
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
  const { colorMode } = useColorMode();

  const color = { light: "black", dark: "white" };
  const inputMargin = useBreakpointValue({
    base: "0.5rem",
    sm: "4rem",
    md: "7rem",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPath = router.asPath;
  const user = useSelector(selectCurrentUser);
  const [userGreeting, setGreeting] = useState(null);
  const [links, setLinks] = useState([
    { text: "Home", url: "/" },
    { text: "Sign Up", url: "/signup" },
    { text: "Log In", url: "/login" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setCredentials({ user: null, token: null }));
    router.push("/");
  };

  useEffect(() => {
    if (typeof user !== "string" && user) {
      const favorites = {
        text: "Favorites",
        url: `/${user.username}/favorites`,
      };
      setGreeting(`Hello, ${user.first_name}!`);
      setLinks((prev) => [...prev].filter((link) => link.text === "Home"));
      setLinks((prev) => [...prev, favorites]);
    }
  }, [user]);

  return (
    <Box mt="0" w="100%" display="flex" color={color[colorMode]}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              display={{ base: "flex", lg: "none" }}
              isActive={isOpen}
              direction="row"
              mt="0.5rem"
              ml="0.5rem"
              as={CButton}
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
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
              }>
              <Search />
            </Center>
            <MenuList>
              {links.map((link, index) => (
                <MenuItem onClick={() => router.push(link.url)} key={index}>
                  {link.text}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
      <Box pt="0.5rem" right={0} top="0.5rem" right="4%" position="absolute">
        {" "}
        {userGreeting}
        <CButton onClick={handleLogout}>Logout</CButton>
      </Box>
      <Flex
        mt="0.5rem"
        direction="row"
        w="100%"
        display={{ base: "none", lg: "flex" }}>
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
