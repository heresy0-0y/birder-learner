import { Box, useColorMode, VStack } from "@chakra-ui/react";
import Image from "next/image";

const CoreContainer = (props) => {
  const { colorMode } = useColorMode();

  const color = { light: "white", dark: "white" };
  return (
    <VStack
      minW="100vw"
      w="100%"
      h="100%"
      minH="100vh"
      color={color[colorMode]}
      {...props}
    ></VStack>
  );
};
export default CoreContainer;
