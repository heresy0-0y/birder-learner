import { default as NextLink } from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

const Link = (props) => {
  const { external, wrapper, url } = props;

  return (
    <NextLink href={url} passHref>
      <ChakraLink isExternal={external}>{props.children}</ChakraLink>
    </NextLink>
  );
};

Link.defaultProps = {
  external: false,
};

export default Link;