import React, { useEffect, useState } from "react";
import { VStack, Skeleton, Spinner, Box, Flex } from "@chakra-ui/react";
import { Playlist } from "./Playlist.jsx";
import {
  useGetLocationFromCoordsQuery,
  useGetLocationsFromQueryQuery,
} from "../../../services/autosuggest";
import { useGetSongsByBirdQuery } from "../../../services/birds";
import dynamic from "next/dynamic";

const Songs = ({ taxonKey }) => {
  const Waveform = dynamic(() => import("./Waveform"), { ssr: false });
  const { data, isLoading } = useGetSongsByBirdQuery(taxonKey);
  const [skipFinal, setFinalSkip] = useState(true);
  const [skip, setSkip] = useState(true);
  const [loading, setLoading] = useState(true);
  const [preTracks, setPreTracks] = useState();
  const [tracks, setTracks] = useState();
  const [songs, setSongs] = useState();
  const [points, setPoints] = useState([]);
  const { data: locations, isSuccess } = useGetLocationFromCoordsQuery(points, {
    skip,
  });
  const {
    data: locationsFrom,
    refetch,
    isFetching,
  } = useGetLocationsFromQueryQuery(locations?.id, { skip: skipFinal });
  const [selectedTrack, setSelected] = useState();

  useEffect(() => {
    if (data) {
      const media = data.results;
      const coords = [];
      const tracksWithoutLocation = media.map((bird, index) => {
        const lat = bird.decimalLatitude;
        const long = bird.decimalLongitude;
        const tracks = bird.media.filter((item) => item.type === "Sound");
        if (lat) coords.push([long, lat]);
        return {
          location: index,
          tracks: tracks,
          date: bird.eventDate,
        };
      });
      setPoints(coords);
      setPreTracks(tracksWithoutLocation);
    }
  }, [data]);

  useEffect(() => {
    if (points.length > 0) {
      setSkip(false);
    }
  }, [points]);

  useEffect(() => {
    if (locations?.id !== undefined) {
      setFinalSkip(false);
    } else {
      setFinalSkip(true);
    }
  }, [locations]);

  useEffect(() => {
    const tracksWithLocation = preTracks;
    if (locationsFrom?.status === "pending") {
      refetch();
    } else if (locationsFrom?.length > 0) {
      locationsFrom.forEach((result, index) => {
        const address = result.formatted;
        const location = address.replace("United States of America", "U.S.");

        tracksWithLocation[index].location = location;
      });
      setTracks(tracksWithLocation);
    }
  }, [locationsFrom, isFetching]);

  useEffect(() => {
    setSongs(tracks);
  }, [tracks]);

  useEffect(() => {
    if (songs) {
      setSelected(songs[0].tracks[0].identifier);
    }
  }, [songs]);

  if (isLoading || isFetching) {
    return (
      <VStack w="100%" h="100%" mt="10%" alignItems="center">
        <Spinner size="xl" mt="10%" />
      </VStack>
    );
  }

  return (
    <>
      <Flex minW="100%" h="100%" direction="column" align="center">
        <Skeleton isLoaded={!loading}>
          <Box h="300" w="100%">
            <Waveform
              url={selectedTrack}
              setLoading={setLoading}
              loading={loading}
            />
          </Box>
        </Skeleton>
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
