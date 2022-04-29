import { default as NextImage } from "next/image";
import { chakra } from "@chakra-ui/react";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => ["height", "width", "quality", "src", "alt"],
});

export default Image