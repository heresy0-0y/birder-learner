import { Flex, useColorMode, VStack } from "@chakra-ui/react";

const CoreContainer = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <VStack
      w='100%'
      minH='100vh'
      // align='center'
      // justify='center'
      // direction="column"
      // alignItems="center"
      // justifyContent="space-between"
      // bg={bgColor[colorMode]}
      bgImage="url('/background.JPG')"
      color={color[colorMode]}
      {...props}
    />
  );
};
export default CoreContainer;
