import { Box, Flex } from "@chakra-ui/react";
import { Button } from "../Buttons/Button.jsx";

const Nav = (props) => {
  const { links } = props;
  return (
    <Box mt="0" w="100vw">
      <Flex mt="0.5rem" direction="row" w="100%">
        <Button text="Show Me Birds!" url="" />
        <Button text="Sign Up" url="" />
        <Button text="Sign In" url="" />
      </Flex>
    </Box>
  );
};

export default Nav;
