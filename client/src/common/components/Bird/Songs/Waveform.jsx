import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import {
  Flex,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Skeleton,
  FormLabel,
  SliderThumb,
} from "@chakra-ui/react";

const Waveform = ({ url }) => {
  const waveform = useRef(null);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [loading, setLoading] = useState(true);

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
      partialRender: true,
      cursorColor: "seafoam-green",
      hideScrollbar: true,
      // closeeAudioContext: true,
    });
    if (url !== undefined) {
      waveform.current.load(`https://corsanyblah.herokuapp.com/${url}`);
    }
    setLoading(true);
    waveform.current.on("ready", function () {
      waveform.current.setVolume(0.1);
      waveform.current.pause();
      return () => waveform.current.destroy();
    });
  }, [url]);

  useEffect(() => {
    waveform.current.on("waveform-ready", function () {
      setLoading(false);
    });
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
    <Flex direction="column" minW="100%" mt="2rem">
      <Skeleton isLoaded={loading}>
        <div id="waveform" ref={waveform} />
      </Skeleton>
      <Flex direction="column" justify="center" mt="1rem">
        <Button m="4" onClick={handlePlayPause} bg="hsla(210, 38%, 95%, 0.1)">
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
      </Flex>
    </Flex>
  );
};

export default Waveform;
