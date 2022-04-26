import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { store } from "../store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
