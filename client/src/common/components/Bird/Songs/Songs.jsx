import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

// , {method: 'GET', cacheControl: 'max-age=31536000', mode: 'no-cors', site: 'cross-site', redirect: 'follow', referrerPolicy: 'strict-origin-when-cross-origin', accept: '*/*', dest: 'audio'}
const testUrl = "https://static.inaturalist.org/sounds/342100.m4a";
// const testUrl='/342100.mp4'
const Songs = ({taxonKey}) => {
  console.log(taxonKey)
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  const {data} = useGetSongsByBirdQuery(taxonKey)
  const [songs,setSongs] = useState(false)
  const [audio, setAudio] = useState(false);

  useEffect(() => {
    if (data) {
      const media = data.results.map(bird => bird.media.filter(media => media.type === 'Sound')[0].identifier)
      setSongs(media)
    }
  },[data])

  useEffect(() => {

    if (songs) {

      setAudio(<audio controls='true' onLoadedMetadata={(e)=> console.log(e)}><source src={songs[0]}/></audio>)
    }
    
  },[songs])
 
  const link = testUrl

  return (
    <>
      <Box w="100%">
        <Waveform url={songs ? songs[0] : '/'} />
      </Box>
        {audio}
    </>
  );
};

export default Songs;
