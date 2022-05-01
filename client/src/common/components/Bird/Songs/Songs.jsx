import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

import {useGetSongsByBirdQuery} from '../../../services/birds'
import dynamic from 'next/dynamic'

const Waveform = dynamic(() => import('./Waveform'), {ssr: false})



const Songs = () => {
const {data} = useGetSongsByBirdQuery()

  return (
    <>
      <Box w='100%' >
        <Waveform  url ="/342100.mp4"/>
      </Box>
    </>
  );
};

export default Songs;
