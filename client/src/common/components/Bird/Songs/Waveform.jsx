import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import {
  Box,
  Flex,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  FormLabel,
  SliderThumb,
  Progress,
} from "@chakra-ui/react";

const Waveform = ({ url }) => {
  const waveform = useRef(null);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.1);
  
  useEffect(() => {
    setPlay(false);

    
    waveform.current = WaveSurfer.create( {
      container: waveform.current,
      waveColor: "#8D86C9",
      progressColor: "#242038",
      barWidth: 3,
      normalize: true,
      partialRender: true,
      
      hideScrollbar: true,
    });

    waveform.current.load(`https://cors-anywhere.herokuapp.com/${url}`);
    waveform.current.on("ready", function () {
      waveform.current.setVolume(0.1);


        waveform.current.pause()
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
    <Flex direction="column" w="100%" mt="2rem">
      <div id="waveform" ref={waveform} />
      <Flex direction="column" justify="center" mt="1rem">
        <Button m="4" onClick={handlePlayPause}>
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
          defaultValue={volume}>
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
