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
  const {
    url,
    name,
    w,
    left,
    top,
    pos,
    h,
    taxonKey,
    layout,
    auth,
    priority,
    maxW,
    maxH,
    sizes,
  } = props;

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
          w={focus ? "95%" : w}
          maxW={maxW ? maxW : null}
          h={focus ? null : height}
          maxH={maxH}
          priority={focus ? "true" : "false"}
          pb={focus ? null : height}
          top={top}
          display={height === "" ? "none" : null}
          borderRadius="xl"
          overflow="hidden"
          position="relative"
        >
          <Image
            src={url}
            sizes="16"
            layout={focus ? "responsive" : "fill"}
            width={focus ? w : null}
            height={focus ? h : null}
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
