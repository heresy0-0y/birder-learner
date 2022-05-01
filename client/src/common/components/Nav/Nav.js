import {
  Box,
  Flex,
  Input,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button as CButton,
  useBreakpointValue
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button } from "../Buttons/Button.jsx";

const Nav = (props) => {
  const searchWidth = useBreakpointValue({base: '10%', sm: '20%'})
  const { links } = props;
  return (
    <Box mt="0" w="100vw">
      <Menu >
        {({isOpen}) => (
          <>
        <MenuButton display={{base: 'flex', md: 'none'}} isActive={isOpen} as={CButton} rightIcon={isOpen ? <ChevronUpIcon/> :<ChevronDownIcon />}> Menu </MenuButton>
        <MenuList>
          <MenuItem>Sign Up</MenuItem>
        </MenuList>
        </>
        )}
      </Menu>
      <Flex mt="0.5rem" direction="row" w="100%" display={{base: 'none', md: 'flex'}}>
        <Button text="Home" url="/" />
        <Button text="Sign Up" url="/signup" />
        <Button text="Sign In" url="/signin" />
        <Box w='10%'/>
        <Input />
        <Box w='15%'/>
      </Flex>
    </Box>
  );
};

export default Nav;
