import React, {useState, useEffect} from 'react'
import {
  Box,
  Flex,
  Input,
  Menu,
  Text,
  MenuList,
  MenuButton,
  MenuItem,
  Button as CButton,
  useBreakpointValue
} from "@chakra-ui/react";
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button } from "../Buttons/Button.jsx";
import {selectCurrentUser} from '../../../store/features/authSlice'

const Nav = () => {
  const router = useRouter()
  const user = useSelector(selectCurrentUser)
  const [userGreeting, setGreeting] = useState(null)
  const [links, setLinks] = useState([{text: "Home", url: '/' },{text: "Sign Up", url: '/signup'},{text: "Log In", url:'/login'}])

  useEffect(() => {
      if (typeof user !== 'string' && user) {
        setGreeting(`Hello ${user.first_name}!`)
        setLinks((prev) => [...prev].filter(link => link.text === 'Home'))
      }
  }, [user])

  return (
    <Box mt="0" w="100vw">
      
      <Menu >
        {({isOpen}) => (
          <>
        <MenuButton display={{base: 'flex', lg: 'none'}} isActive={isOpen} as={CButton} rightIcon={isOpen ? <ChevronUpIcon/> :<ChevronDownIcon />}> Menu </MenuButton>
        <MenuList>
          {links.map((link) => (
            <>
            <MenuItem onClick={() => router.push(link.url)} >{link.text}</MenuItem>
            </>
          ))}
        </MenuList>
        </>
        )}
      </Menu>
      <Flex mt="0.5rem" direction="row" w="100%" display={{base: 'none', lg: 'flex'}}>
        {userGreeting}
        {links.map((link) => (
            <>
            <Button text={link.text} url={link.url}/>
            </>
          ))}
        <Box w='10%'/>
        <Input />
        <Box w='15%'/>
      </Flex>
    </Box>
  );
};

export default Nav;
