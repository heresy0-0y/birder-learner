import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  useAddUserMutation,
  useGetUsersQuery,
} from "../../common/services/auth";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Input,
  Button,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { setCredentials } from "../../store/features/authSlice";

export default function () {
  const router = useRouter();

  const { colorMode } = useColorMode();
  const color = { light: "#002A64", dark: "#C8FFBA" };
  const borderColor = color[colorMode];
  const bg = { light: "#ACC1DF", dark: "#13315A" };

  const { data: usernames, isSuccess } = useGetUsersQuery();
  const [addUser, { isLoading }] = useAddUserMutation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const passwordError = form.password.length < 7 && form.password;

  const usernameError = usernames
    ? usernames.includes(form.username) && form.username
    : null;

  const handleSubmit = async () => {
    try {
      const newUser = { user: { ...form } };
      const user = await addUser(newUser);
      dispatch(setCredentials(user));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (error) {}
  };

  const handleKBEnter = (e) => {
    e.key === "Enter" ? handleSubmit() : null;
  };

  const handleShow = () => setShow(!show);
  return (
    <Container my="15%">
      <FormControl isRequired isInvalid={usernameError}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          mb="3%"
          id="username"
          borderColor={borderColor}
          type="username"
          name="username"
          onChange={handleChange}
        />
        <FormErrorMessage>
          Sorry, that username is already taken
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          onKeyDown={handleKBEnter}
          id="email"
          name="email"
          type="email"
          borderColor={borderColor}
          onChange={handleChange}
          mb="3%"
        />
        <FormLabel htmlFor="first_name">First Name</FormLabel>
        <Input
          onKeyDown={handleKBEnter}
          id="first_name"
          type="first_name"
          name="first_name"
          borderColor={borderColor}
          onChange={handleChange}
          mb="3%"
        />
        <FormLabel htmlFor="last_name">Last Name</FormLabel>
        <Input
          borderColor={borderColor}
          onKeyDown={handleKBEnter}
          id="last_name"
          name="last_name"
          onChange={handleChange}
          mb="3%"
        />
        <FormControl isInvalid={passwordError} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              onKeyDown={handleKBEnter}
              name="password"
              borderColor={borderColor}
              type={show ? "text" : "password"}
              onChange={handleChange}
              mb="3%"
            />
            <InputRightElement w="10%" minW="55px">
              <Button
                border="none"
                h="95%"
                _hover={{ bg: `${bg[colorMode]}` }}
                w="95%"
                bg="hsla(210, 38%, 95%, 0.1)"
                onClick={() => setShow(!show)}
              >
                Show
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            password must be at least 7 characters
          </FormErrorMessage>
        </FormControl>
        <Button
          _hover={{ bg: `${bg[colorMode]}` }}
          type="submit"
          onClick={handleSubmit}
          isLoading={isLoading}
          bg="hsla(210, 38%, 95%, 0.1)"
        >
          Sign Up{" "}
        </Button>
      </FormControl>
    </Container>
  );
}
