import React, { useEffect, useState } from "react";
import { VStack, Skeleton, Spinner } from "@chakra-ui/react";
import {Playlist} from './Playlist.jsx'
import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

const Songs = ({ taxonKey }) => {
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  const { data, isLoading } = useGetSongsByBirdQuery(taxonKey);
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

  if (isLoading) {
    return <VStack w="100%" h="100%" mt="10%" alignItems="center"><Spinner size="xl" isIndeterminate/></VStack>
  }

  return (
    <>
      <VStack minW="100%" h="100%">
        <Skeleton isLoaded={!isLoading} w="100%">
        <Waveform url={selectedTrack} />
        </Skeleton>
        <Playlist songs={songs} selectedTrack={selectedTrack} setSelected={setSelected} />
      </VStack>
    </>
  );
};

export default Songs;
