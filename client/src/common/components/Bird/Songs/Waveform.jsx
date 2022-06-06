import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import {
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Skeleton,
  Box,
  FormLabel,
  Center,
  SliderThumb,
  useColorMode,
} from "@chakra-ui/react";

const Waveform = ({ url }) => {
  const { colorMode } = useColorMode();
  const bg = { light: "#ACC1DF", dark: "#13315A" };

  const waveform = useRef(null);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    setPlay(false);

    waveform.current = WaveSurfer.create({
      container: waveform.current,
      waveColor: "#00F2AB",
      progressColor: "#C8FFBA",
      barWidth: 3,
      responsive: true,
      barRadius: 2,
      normalize: true,

      cursorColor: "seafoam-green",
      hideScrollbar: true,
    });
    if (url !== undefined) {
      waveform.current.load(`/api?endpoint=${url}`);
    }
    waveform.current.on("ready", function () {
      waveform.current.setVolume(volume);
      waveform.current.pause();
      return () => waveform.current.destroy();
    });
  }, [url]);

  useEffect(() => {
    waveform.current.on("finish", function () {
      setPlay(false);
    });
  }, [url]);

  const handlePlayPause = () => {
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
    setPlay(!play);
  };
  const handleVolume = (e) => {
    const newVolume = +e;

    if (newVolume) {
      setVolume(newVolume);
      waveform.current.setVolume(newVolume || 1);
    }
  };

  return (
    <>
      <Center>
        <Box mt="3%" w="95%" align="center">
          <div minHeight="10%" id="waveform" ref={waveform} />

          <Button
            m="4"
            onClick={handlePlayPause}
            bg="hsla(210, 38%, 95%, 0.1)"
            _hover={{ bg: `${bg[colorMode]}` }}
          >
            {play ? "pause" : "play"}
          </Button>
          <Slider
            aria-label="volume slider"
            id="volume"
            name="volume"
            min={0.01}
            max={1}
            step={0.025}
            onChange={handleVolume}
            defaultValue={volume}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={3} />
          </Slider>
          <FormLabel>volume</FormLabel>
        </Box>
      </Center>
    </>
  );
};

export default Waveform;
