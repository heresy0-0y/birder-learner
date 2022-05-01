import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

// , {method: 'GET', cacheControl: 'max-age=31536000', mode: 'no-cors', site: 'cross-site', redirect: 'follow', referrerPolicy: 'strict-origin-when-cross-origin', accept: '*/*', dest: 'audio'}
const testUrl = "https://static.inaturalist.org/sounds/342100.m4a?1641022559";
// const testUrl='/342100.mp4'
const Songs = () => {
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  // const {data} = useGetSongsByBirdQuery()

  const [audio, setAudio] = useState("/");
  const link = testUrl

    async function getAudioFile() {
      const response = await fetch(link);
      const file = response;
      setAudio(file);
    }
    if (typeof audio === 'string') {
      getAudioFile()
    }
    console.log(audio)

  return (
    <>
      <Box w="100%">
        <Waveform url={audio} />
      </Box>
    </>
  );
};

export default Songs;
