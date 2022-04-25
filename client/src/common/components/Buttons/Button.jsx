import { Button as CButton, IconButton, HStack, Text } from "@chakra-ui/react";
import { Link } from "../Link/Link.jsx";

export const Button = (props) => {
  const { text, url, icon } = props;

  return (
    <Link url={url}>
      <CButton variant="ghost" rightIcon={icon}>{text} </CButton>
    </Link>
  );
};
