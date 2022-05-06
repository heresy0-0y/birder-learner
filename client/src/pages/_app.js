import Head from "next/head";
import {useDispatch} from 'react-redux'
import React, {useState, useEffect} from "react";
import { ChakraProvider, ColorModeProvider, Wrap } from "@chakra-ui/react";
import theme from "../theme";
import Image from "next/image";
import { wrapper } from "../store/store.js";
import {setCredentials} from '../store/features/authSlice'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({user: null, token: null});
  const dispatch = useDispatch()
  useEffect(() => {
    const checkForSession = async () => { 
      const localUserString = localStorage.getItem('user')
      const localUser = JSON.parse(localUserString)
      setUser(localUser)
    }
    checkForSession();
  },[])
  useEffect(() => {
    dispatch(setCredentials(user))

  },[user])

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
              src={"/background.JPG"}
              layout="fill"
              quality="100"
              objectFit="cover"
            />
          </Wrap>
          <Component {...pageProps} user={user} />
        </ColorModeProvider>
      </ChakraProvider>

  );
}

export default wrapper.withRedux(MyApp);
