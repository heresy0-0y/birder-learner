import Head from 'next/head'
import { Provider } from "react-redux";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { store } from "../store/store.js";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}>
          <Head>
            <meta name="viewport" content="viewport-fit=cover"/>
          </Head>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
