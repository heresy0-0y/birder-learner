import React from "react";
import Songs from "./Songs/Songs";
import { useRouter } from "next/router";
import {
  Box,
  useColorModeValue,
  useBreakpointValue,
  Image,
  SkeletonCircle,
} from "@chakra-ui/react";

const Bird = (props) => {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");

  const { img, name, taxonKey, w, h } = props;
  const fallback = <SkeletonCircle w="100%" h="100%" />;
  let songs = false;

  const router = useRouter().asPath;

  if (router.includes("songs")) {
    songs = true;
  }

  return (
    <>
    <Box borderRadius="xl" overflow="hidden" w={w} h={h}>
      <Image
        src={img}
        loading="eager"
        height="100%"
        width="100%"
        objectFit="cover"
        fallback={fallback}
        alt={`image of ${name}`}
      />
    </Box>
     {songs? <Songs taxonKey={taxonKey}/> : null}
     </>
  );
};

export default Bird;
