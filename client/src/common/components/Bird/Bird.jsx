import React, { useState, useRef } from "react";
import Songs from "./Songs/Songs";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Box,
  Spinner,
  useColorModeValue,
  useBreakpointValue,
  Container,
  VisuallyHidden,
  HStack,
  SkeletonCircle,
} from "@chakra-ui/react";

export default function (props) {
  const image = useRef(null);
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  let focus = false;
  let boxWidth = null;
  const [padding, setPadding] = useState("100%");
  const [height, setHeight] = useState("unset");
  const { img, name, w, left, top, pos, h, taxonKey, auth } = props;

  const fallback = <SkeletonCircle w="100%" h="100%" />;

  const router = useRouter().asPath;
  if (router.includes("songs")) {
    focus = true;
    boxWidth = "100%";
  }
  if (h === 0) {
    return <Spinner />;
  } else {
    return (
      <>
        <Box
          w={w}
          h={height}
          left={left}
          priority={focus ? "true" : "false"}
          pb={height}
          top={top}
          display={height === "" ? "none" : null}
          borderRadius="xl"
          overflow="hidden"
          position="relative">
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            loading="eager"
            onLoad={({ target }) => {
              const { naturalWidth, naturalHeight, width } = target;
             
                setHeight(naturalHeight * (width / naturalWidth));
              
              setPadding(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
            }}
            fallback={fallback}
            alt={`image of ${name}`}
          />
        </Box>

        {focus ? <Songs auth={auth} taxonKey={taxonKey} /> : null}
      </>
    );
  }
}
