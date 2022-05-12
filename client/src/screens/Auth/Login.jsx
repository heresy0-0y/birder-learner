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
} from "@chakra-ui/react";
import {
  setCredentials,
  selectCurrentUser,
} from "../../store/features/authSlice";
import { useLoginMutation } from "../../common/services/auth";

export default function (props) {
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

  return (
    <Container my="15%">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input name="username" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            type={show ? "text" : "password"}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button onClick={() => setShow(!show)}>Show</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Submit
      </Button>
    </Container>
  );
}
