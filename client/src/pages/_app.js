import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/features/authSlice";
import Image from "next/image";
import { wrapper } from "../store/store.js";
import { ChakraProvider, ColorModeProvider, Wrap } from "@chakra-ui/react";
import theme from "../theme";
import backgroundImage from '../../public/background.jpeg'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ user: null, token: null });
  const dispatch = useDispatch();
  useEffect(() => {
    const checkForSession = async () => {
      const localUserString = localStorage.getItem("user");
      const localUser = JSON.parse(localUserString);
      if (localUser !== null) {
        if ( Object.keys(localUser).includes("user")) {

          setUser(localUser);
        }
      }
    };
    checkForSession();
  }, []);
  useEffect(() => {
    dispatch(setCredentials(user));
  }, [user]);

  return (
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
            priority

            loading="eager"
            src={backgroundImage}
            layout="fill"
            placeholder="blur"
            quality="100"
            objectFit="cover"
          />
        </Wrap>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
