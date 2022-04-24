import { VStack } from "@chakra-ui/react";
import { Container, DarkModeSwitch, Nav } from "./components";

const CoreLayout = (props) => {
  return (
    <Container >
    <Nav/>
      <VStack>{props.children}</VStack>
      <DarkModeSwitch />
    </Container>
  );
};

export default CoreLayout;
