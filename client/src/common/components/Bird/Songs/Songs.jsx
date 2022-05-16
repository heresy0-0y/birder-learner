import React, { useEffect, useState } from "react";
import { VStack, Skeleton, Spinner, Box, Flex } from "@chakra-ui/react";
import { Playlist } from "./Playlist.jsx";
import { useGetLocationFromCoordsQuery } from "../../../services/autosuggest";
import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

const Songs = ({ taxonKey }) => {
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  const { data, isLoading } = useGetSongsByBirdQuery(taxonKey);
  const [songs, setSongs] = useState();
  const [tracks, setTracks] = useState();
  const [preTracks, setPreTracks] = useState();
  const [skip, setSkip] = useState(true);
  const [points, setPoints] = useState([]);
  const { data: locations, isSuccess } = useGetLocationFromCoordsQuery(points, {
    skip,
  });
  const [selectedTrack, setSelected] = useState();

  useEffect(() => {
    if (data) {
      const media = data.results;
      const coords = [];
      const tracksWithoutLocation = media.map((bird, index) => {
        const lat = bird.decimalLatitude;
        const long = bird.decimalLongitude;
        const tracks = bird.media.filter((item) => item.type === "Sound");
        coords.push(`${lat},${long}`);

        return {
          location: index,
          tracks: tracks,
          date: bird.eventDate,
        };
      });
      setPoints({ locations: coords });
      setPreTracks(tracksWithoutLocation);
    }
  }, [data]);

  useEffect(() => {
    if (points?.locations?.length > 0) {
      setSkip(false);
    }
  }, [points]);

  useEffect(() => {
    const tracksWithLocation = preTracks;
    if (locations) {
      locations.results.forEach((result, index) => {
        const locations = result.locations[0];

        const cityOrCounty = `${
          locations?.adminArea5 !== "" &&
          locations?.adminArea5 &&
          !/\d/.test(locations.adminArea5)
            ? locations?.adminArea5
            : locations?.adminArea4
        }`;
        const address = `${cityOrCounty}, ${locations.adminArea3}, ${locations.adminArea1}`;

        tracksWithLocation[index].location = address;
      });
      setTracks(tracksWithLocation);
    }
  }, [locations]);

  useEffect(() => {
    setSongs(tracks);
  }, [tracks]);

  useEffect(() => {
    if (songs) {
      setSelected(songs[0].tracks[0].identifier);
    }
  }, [songs]);

  if (isLoading) {
    return (
      <VStack w="100%" h="100%" mt="10%" alignItems="center">
        <Spinner size="xl" mt="10%" />
      </VStack>
    );
  }

  return (
    <>
      <Flex minW="100%" h="100%" direction="column" align="center">
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
      </Flex>
    </>
  );
};

export default Songs;
