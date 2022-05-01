import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

import {useGetSongsByBirdQuery} from '../../../services/birds'
import dynamic from 'next/dynamic'

const Waveform = dynamic(() => import('./Waveform'), {ssr: false})

// const testUrl='https://static.inaturalist.org/sounds/342100.m4a?1641022559'
const testUrl='/342100.mp4'

const Songs = () => {
const {data} = useGetSongsByBirdQuery()

  return (
    <>
      <Box w='100%' >
        <Waveform  url={testUrl}/>
      </Box>
    </>
  );
};

export default Songs;
