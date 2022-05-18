import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import {
  setCredentials,
  selectCurrentUser,
} from "../../store/features/authSlice";
import { useLoginMutation } from "../../common/services/auth";

export default function (props) {
  const { colorMode } = useColorMode();
  const color = { light: "#002A64", dark: "#C8FFBA" };
  const borderColor = color[colorMode];
  const bg = { light: "#ACC1DF", dark: "#13315A" };

  const router = useRouter();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  let logged = useSelector(selectCurrentUser);

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const user = await login(form).unwrap();
      dispatch(setCredentials(user));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/search");
    } catch (err) {
      toast({
        status: "error",
        title: "Error",
        description: "Whoops! Something went wrong",
        isCloseable: true,
      });
    }
  };

  const handleKBEnter = (e) => {
    e.key === "Enter" ? handleSubmit() : null;
  };

  return (
    <Container my="15%">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          borderColor={borderColor}
          name="username"
          onChange={handleChange}
          mb="3%"
          onKeyDown={handleKBEnter}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            mb="3%"
            borderColor={borderColor}
            name="password"
            type={show ? "text" : "password"}
            onChange={handleChange}
            onKeyDown={handleKBEnter}
          />
          <InputRightElement w="10%" minW="55px">
            <Button
              h="95%"
              _hover={{ bg: `${bg[colorMode]}` }}
              w="95%"
              bg="hsla(210, 38%, 95%, 0.1)"
              border="none"
              onClick={() => setShow(!show)}
            >
              Show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        _hover={{ bg: `${bg[colorMode]}` }}
        bg="hsla(210, 38%, 95%, 0.1)"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Container>
  );
}
