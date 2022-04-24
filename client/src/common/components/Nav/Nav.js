
import { Box, Flex } from "@chakra-ui/react";
import {Button} from '../Buttons/Button.jsx'

const Nav = (props) => {
  return (
    <Box mt="0">
      <Flex>
        <Button text='Sign Up' url='/signup' />
      </Flex>
    </Box>
  );
};

export default Nav