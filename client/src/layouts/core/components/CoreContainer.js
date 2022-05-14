import { Box, Flex, useColorMode, VStack } from "@chakra-ui/react";
import Image from "next/image";

const CoreContainer = (props) => {
  const { colorMode } = useColorMode();

  const color = { light: "#002A64", dark: "#C8FFBA" };
  return (
    <Flex
      position="relative"
      direction="column"
      align="center"
      minW="100vw"
      minH="100vh"
      h="100%"
      color={color[colorMode]}
    >
      {props.children}
    </Flex>
  );
};
export default CoreContainer;
