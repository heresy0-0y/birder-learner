import React, { useEffect, useState, useRef} from "react";
import { Box } from "@chakra-ui/react";

import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

// , {method: 'GET', cacheControl: 'max-age=31536000', mode: 'no-cors', site: 'cross-site', redirect: 'follow', referrerPolicy: 'strict-origin-when-cross-origin', accept: '*/*', dest: 'audio'}
// const testUrl = "https://static.inaturalist.org/sounds/342100.m4a";
const testUrl='/342100.mp4'
const Songs = ({taxonKey}) => {
  const audie = useRef(null)
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

      setAudio(<audio ref={audie} controls onLoadedMetadata={(e)=> console.log(e)}><source src={testUrl}/></audio>)
      console.log(audie)

    }
  },[songs])
  const link = testUrl
  useEffect(() => {
    if (audie) {

      console.log(audie.current)
      const media = window.MediaSource
     

      console.log(media)
    }

  },[audie])
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
