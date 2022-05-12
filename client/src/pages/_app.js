import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/features/authSlice";
import Image from "next/image";
import { wrapper } from "../store/store.js";
import { ChakraProvider, ColorModeProvider, Wrap } from "@chakra-ui/react";
import theme from "../theme";
import backgroundImage from "../../public/bg1.webp";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ user: null, token: null });
  const dispatch = useDispatch();
  useEffect(() => {
    const checkForSession = async () => {
      const localUserString = localStorage.getItem("user");
      const localUser = JSON.parse(localUserString);
      if (localUser !== null) {
        if (Object.keys(localUser).includes("user")) {
          setUser(localUser);
        }
      }
    };
    checkForSession();
  }, []);
  useEffect(() => {
    dispatch(setCredentials(user));
  }, [user, dispatch]);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Head>
          <title>Sounds Alive</title>
          <meta
            name="viewport"
            content="viewport-fit=cover, width=device-width, initial-scale=1"
          />
        </Head>
        <Wrap zIndex="-2" position="fixed" h="100vh" w="100vw">
          <Image
            alt="background image - clouds in a blue sky"
            priority
            loading="eager"
            src={backgroundImage}
            layout="fill"
            placeholder="blur"
            as="backgroundImage"
            objectFit="cover"
          />
        </Wrap>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

export function reportWebVitals(metric) {
  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT;

  if (!url) {
    return;
  }

  const body = JSON.stringify({
    route: window.__NEXT_DATA__.page,
    ...metric,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
}
