import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
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
import {setCredentials} from '../../store/features/authSlice'

export default function () {
  const router = useRouter()
  const { data: usernames, isSuccess } = useGetUsersQuery();
  const [addUser, {isLoading} ] = useAddUserMutation()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    "username": '',
    "password": '',
    "email": '',
    "first_name": '',
    "last_name": ''
  })

  const handleChange = ({target: {name, value}}) => {
      setForm((prev) => ({...prev, [name]: value}))
  }

  const passwordError = form.password.length < 7 && form.password;
  
  const usernameError =  usernames ? usernames.includes(form.username) && form.username : null

  const handleSubmit = async () => {
    try {
      const newUser = {"user": {...form}}
      const user = await addUser(newUser)
      dispatch(setCredentials(user))
      router.push('/')
    } catch (error) {

    }
  }

  const handleShow = () => setShow(!show);
  return (
    <Container top="15%" position="absolute">
      <FormControl isRequired isInvalid={usernameError} >
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" type="username" name='username' onChange={handleChange}/>
        <FormErrorMessage>Sorry, that username is already taken</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" name="email" type="email" onChange={handleChange}/>
        <FormLabel htmlFor="first_name">First Name</FormLabel>
        <Input id="first_name" type="first_name" name="first_name" onChange={handleChange}/>
        <FormLabel htmlFor="last_name">Last Name</FormLabel>
        <Input id="last_name" name="last_name" onChange={handleChange}/>
        <FormControl isInvalid={passwordError}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input name="password" onChange={handleChange}/>
          <FormErrorMessage>password must be at least 7 characters</FormErrorMessage>
        </FormControl>
        <Button type="submit" onClick={handleSubmit}>Sign Up </Button>
      </FormControl>
    </Container>
  );
}
