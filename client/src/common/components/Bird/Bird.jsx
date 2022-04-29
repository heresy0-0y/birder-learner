import React from "react";
import Songs from "./Songs";
import { useRouter } from "next/router";
import {
  Box,
  useColorModeValue,
  Image,
  SkeletonCircle,
} from "@chakra-ui/react";

const Bird = (props) => {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  const { img, name } = props;
  const fallback = <SkeletonCircle w="100%" h="100%" />;
  let songs = false;

  const router = useRouter().asPath;

  if (router.includes("songs")) {
    songs = true;
  }

  return (
    <Box
      borderRadius="xl"
      overflow="clip"
      h="100%"
      w="100%"
      marginBottom="0.75rem">
      <Image
        src={img}
        loading="eager"
        height="100%"
        width="100%"
        objectFit="cover"
        fallback={fallback}
        alt={`image of ${name}`}
      />
      {songs ? <Songs /> : null}
    </Box>
  );
};

export default Bird;
