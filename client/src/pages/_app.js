import Head from "next/head";
import { Provider } from "react-redux";
import React from "react";
import { ChakraProvider, ColorModeProvider, Wrap } from "@chakra-ui/react";
import theme from "../theme";
import Image from "next/image";
import { wrapper } from "../store/store.js";

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}>
          <Head>
            <meta name="viewport" content="viewport-fit=cover" />
          </Head>
          <Wrap zIndex="-2" position="fixed" h="100vh" w="100vw">
            <Image
              src={"/background.jpg"}
              layout="fill"
              quality="100"
              objectFit="cover"
            />
          </Wrap>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    // </Provider>
  );
}

export default wrapper.withRedux(MyApp);
