import React, { useState } from "react";
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
  Button,
  SkeletonCircle,
} from "@chakra-ui/react";

export default function (props) {
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  let focus = false;
  let boxWidth = null;
  const [padding, setPadding] = useState("100%");
  const [height, setHeight] = useState("unset");
  const { url, name, w, left, top, pos, h, taxonKey, auth, priority, maxW, sizes } =
    props;

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
          maxW={maxW}
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
            src={url}
            sizes="16"
            layout="fill"
            objectFit="cover"
            loading="eager"
            priority={priority}
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
