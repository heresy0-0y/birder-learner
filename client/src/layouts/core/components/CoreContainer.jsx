import { Box, Flex, useColorMode, VStack } from "@chakra-ui/react";
import Image from "next/image";

const CoreContainer = (props) => {
  const { colorMode } = useColorMode();

  const color = { light: "#002A64", dark: "#C8FFBA" };
  return (
    <Flex
      position="relative"
      direction="column"
      minW="100vw"
      minH="100vh"
      w="100vw"
      h="100%"
      align="center"
      color={color[colorMode]}
    >
      {props.children}
    </Flex>
  );
};
export default CoreContainer;
