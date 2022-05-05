import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import {Playlist} from './Playlist.jsx'
import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

const Songs = ({ taxonKey }) => {
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  const { data } = useGetSongsByBirdQuery(taxonKey);
  const [songs, setSongs] = useState(false);
  const [selectedTrack, setSelected] = useState(songs[0])

  useEffect(() => {
    if (data) {
      const media = data.results.map(
        (bird) =>
          bird.media.filter((media) => media.type === "Sound")[0]
      );
      setSongs(media);
    }
  }, [data]);
  console.log(taxonKey)
  useEffect(() => {
    if (songs) {
      setSelected(songs[0].identifier)
    }
  },[songs])

  return (
    <>
      <VStack minW="100%" h="100%">
        <Waveform url={selectedTrack} />
        <Playlist songs={songs} selectedTrack={selectedTrack} setSelected={setSelected} />
      </VStack>
    </>
  );
};

export default Songs;
