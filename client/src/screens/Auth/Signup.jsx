import React, { useState } from "react";
import {
  useAddUserMutation,
  useGetUsersQuery,
} from "../../common/services/auth";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";

export default function () {
  const { data: usernames, isSuccess } = useGetUsersQuery();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const passwordError = password.length < 7 && password;
  const usernameError = usernames.includes(username) && username

console.log(usernames)

  const handleShow = () => setShow(!show);
  return (
    <Container top="15%" position="absolute">
      <FormControl isRequired isInvalid={usernameError} >
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" type="username" value={username} onChange={e => setUsername(e.target.value)}/>
        <FormErrorMessage>Sorry, that username is already taken</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" />
        <FormLabel htmlFor="first_name">First Name</FormLabel>
        <Input id="first_name" type="first_name" />
        <FormLabel htmlFor="last_name">Last Name</FormLabel>
        <Input id="last_name" type="last_name" />
        <FormControl isInvalid={passwordError}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
          <FormErrorMessage>password must be at least 7 characters</FormErrorMessage>
        </FormControl>
        <Button type="submit">Sign Up </Button>
      </FormControl>
    </Container>
  );
}
