import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import WebAudioAnalyser from 'web-audio-analyser'
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
  (function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      var args = slice.call(arguments);
      var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host) {
        args[1] = cors_api_url + args[1];
      }
      return open.apply(this, args);
    };
  })
  const [blob, setBlob] = useState()


  const waveform = useRef(null);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.1);
  useEffect(() => {
    const fetchBlob = async () => {
      const file = await // inaturalist sounds (GET https://static.inaturalist.org/sounds/342100.m4a)
      fetch("https://static.inaturalist.org/sounds/342100.m4a", {
            "method": "GET",
            "headers": {
                  "Authorization": "Basic Og=="
            }
      })
      .then((res) => res.text())
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
      
      
      
      

      console.log(file)
      console.log(typeof file)
      setBlob(file)
    }
    fetchBlob()
  }, [url])

  useEffect(() => {
    setPlay(false);
    waveform.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#8D86C9",
      progressColor: "#242038",

      backend: 'MediaElement',
      normalize: true,

      hideScrollbar: true,
    });



    waveform.current.load(`https://cors-anywhere.herokuapp.com/${url}`);
    waveform.current.on("waveform-ready", function () {
      if (waveform.current) {

        setVolume(volume);
        waveform.current.setVolume(volume);
      }
      return () => waveform.current.destroy();
    });
  }, [url]);

  useEffect(() => {
    waveform.current.on("finish", function () {
      setPlay(false);
    });
  },[blob]);

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
