import React, { useState, useEffect } from "react";
import Songs from "./Songs/Songs";
import { useRouter } from "next/router";

import Image from "next/image";
import {
  Box,
  Spinner,
  useColorModeValue,
  SkeletonCircle,
} from "@chakra-ui/react";

export default function (props) {
  const { url, name, w, top, h, taxonKey, auth, priority, maxW, maxH } = props;
  const fallbackFilter = useColorModeValue("none", "invert(90%)");
  const [height, setHeight] = useState("unset");
  const [style, setStyle] = useState({
    width: null,
    height: null,
    boxWidth: w,
    boxHeight: height,
    priority: priority,
  });

  const fallback = <SkeletonCircle w="100%" h="100%" />;

  const router = useRouter();

  useEffect(() => {
    focus = true;
    if (router.asPath.includes("songs")) {
      setHeight(null);
      let focusStyle = {
        boxHeight: h,
        priority: true,
        boxWidth: w,
        focus: true,
      };
      setStyle((prev) => ({ ...prev, ...focusStyle }));
    } else {
      setStyle((prev) => ({ ...prev, pb: height }));
    }
  }, [height]);

  if (h === 0) {
    return <Spinner />;
  } else {
    return (
      <>
        <Box
          w={style.boxWidth}
          maxW={maxW ? maxW : null}
          h={style.boxHeight}
          maxH={maxH}
          pb={height}
          top={top}
          display={height === "" ? "none" : null}
          borderRadius="xl"
          overflow="hidden"
          position="relative"
        >
          <Image
            src={url}
            sizes="16"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 20%"
            loading="eager"
            priority={priority}
            onLoad={({ target }) => {
              const { naturalWidth, naturalHeight, width } = target;

              setHeight(naturalHeight * (width / naturalWidth));
            }}
            fallback={fallback}
            alt={`image of ${name}`}
          />
        </Box>

        {style.focus ? <Songs auth={auth} taxonKey={taxonKey} /> : null}
      </>
    );
  }
}
