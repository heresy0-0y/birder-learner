import React from "react";
import Songs from "./Songs/Songs";
import { useRouter } from "next/router";
import {
  Box,
  useColorModeValue,
  useBreakpointValue,

  Image,
  HStack,
  SkeletonCircle,
} from "@chakra-ui/react";

export default function(props) {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  let songs = false;
  let boxWidth = null
  const { img, name, taxonKey, w, h, left, top, pos } = props;
  const fallback = <SkeletonCircle w="100%" h="100%" />;


  const router = useRouter().asPath;
  if (router.includes("songs")) {
    songs = true;
    boxWidth = '100%'
  }


  return (
    <Box w={boxWidth}>
      <Box borderRadius="xl" overflow="hidden" w={w} h={h} left={left} top={top} position={pos}>
        <Image
          src={img}
          loading="eager"
          height="100%"
          width="100%"
          objectFit="cover"
          fallback={fallback}
          alt={`image of ${name}`} />
      </Box>
      {songs ? <Songs taxonKey={taxonKey} /> : null}
    </Box>
  );
}


