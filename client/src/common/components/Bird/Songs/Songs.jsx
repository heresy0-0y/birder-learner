import React, { useEffect, useState } from "react";
import { VStack, Skeleton, Spinner, Box } from "@chakra-ui/react";
import { Playlist } from "./Playlist.jsx";
import {useGetLocationFromCoordsQuery} from '../../../services/autosuggest'
import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

const Songs = ({ taxonKey }) => {
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  const { data, isLoading } = useGetSongsByBirdQuery(taxonKey);
  const [songs, setSongs] = useState();
  const [point, setPoint] = useState()
  const {data: location, isFulfilled} = useGetLocationFromCoordsQuery(point)
  const [selectedTrack, setSelected] = useState();
  const apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY;

  useEffect(() => {
    if (data) {
      const media = data.results;


      async function makeTheTracks() {
        const tracksWithDateAndLocation = media.map(async (bird) => {
          const lat = await  bird.decimalLatitude;
          const long = await bird.decimalLongitude;
          const tracks = bird.media.filter((index) => index.type === "Sound");
          setPoint(`${lat},${long}`)
          const yes = await isFulfilled
          const response = await location
          const address = response.resourceSets[0].resources[0].address
          if (address?.error) {
            return null;
          }
          return {
            location: `${address.locality}, ${address.adminDistrict}, ${address.adminDistrict2 ? `${address.adminDistrict2}, ${address.countryRegion}` : address.countryRegion}`,
            tracks: tracks,
            date: bird.eventDate,
          };
        });
        const resolved = await Promise.all(tracksWithDateAndLocation).then(
          (tracks) => {
            const list = tracks.filter((track) => track !== null);
            setSongs(list);
          }
        );
      }
      makeTheTracks();
    }
  }, [data]);

  useEffect(() => {
    if (songs) {
      setSelected(songs[0].tracks[0].identifier);
    }
  }, [songs]);

  if (isLoading) {
    return (
      <VStack w="100%" h="100%" mt="10%" alignItems="center">
        <Spinner size="xl" />
      </VStack>
    );
  }

  return (
    <>
      <VStack minW="100%" h="100%">
        <Box h="300" w="100%">
          <Waveform url={selectedTrack} />
        </Box>
        <Skeleton isLoaded={!isLoading} w="100%">
          <Playlist
            songs={songs}
            selectedTrack={selectedTrack}
            setSelected={setSelected}
          />
        </Skeleton>
      </VStack>
    </>
  );
};

export default Songs;
