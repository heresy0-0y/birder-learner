import { Button as CButton, IconButton, HStack, Text } from "@chakra-ui/react";
import { default as Link } from "../Link/Link";

export const Button = (props) => {
  const { text, url, icon, w } = props;

  return (
    <>
    <Link url={url}>
      <CButton w={w} variant="ghost" rightIcon={icon}>{text}</CButton>
    </Link>
    </>
  );
};
