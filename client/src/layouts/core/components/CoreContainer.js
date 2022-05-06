import { Box, useColorMode, VStack } from "@chakra-ui/react";
import Image from "next/image";

const CoreContainer = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <>
      <VStack
        minW="100vw"
        zIndex="3"
        minH="100vh"
        color={color[colorMode]}
        {...props}></VStack>
    </>
  );
};
export default CoreContainer;
