import Head from "next/head";
import { Layout } from "../layouts/core";
import Image from "next/image";
import { wrapper } from "../store/store.js";
import { ChakraProvider, ColorModeProvider, Box, Flex } from "@chakra-ui/react";
import "@fontsource/mononoki";
import "@fontsource/nova-mono";
import theme from "../theme";
import backgroundImage from "../../public/bg1.webp";

function MyApp({ Component, pageProps }) {
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
            content="viewport-fit=cover, width=device-width, height=device-height, initial-scale=1"
          />
          <meta
            name="description"
            content="Sounds Alive; see and hear birds in your neighborhood, aggregated from the Global Biodiversity Information Facility API"
          />
        </Head>

        <Flex
          position="static"
          w="100"
          h="100%"
          direction="column"
          align="center"
        >
          <Box
            zIndex="-3"
            position="fixed"
            w="100%"
            h="100%"
            top="0"
            bottom="0"
            left="0"
          >
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
          </Box>
        </Flex>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

// Axiom Log DB

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
