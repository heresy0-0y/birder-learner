import { default as NextLink } from "next/link";
import { LinkOverlay as ChakraLink, LinkBox } from "@chakra-ui/react";

const Link = (props) => {
  const { external, wrapper, url } = props;

  return (
    <LinkBox>
    <NextLink href={url} passHref>
      <ChakraLink isExternal={external}>{props.children}</ChakraLink>
    </NextLink>
    </LinkBox>
  );
};

Link.defaultProps = {
  external: false,
};

export default Link;
