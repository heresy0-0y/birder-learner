import { VStack } from "@chakra-ui/react";
import { Container, DarkModeSwitch } from "./components";

const CoreLayout = (props) => {
  return (
    <Container >
      <VStack>{props.children}</VStack>
      <DarkModeSwitch />
    </Container>
  );
};

export default CoreLayout;
