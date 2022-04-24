import { Button as CButton, IconButton, HStack, Text } from "@chakra-ui/react";
import { Link } from "../Link/Link.js";

export const Button = (props) => {
  const { link, icon, text, url } = props;

  return (
    <Link url={url} text-decoration='none'>
      <CButton variant='ghost' decoration='none'>
  {text}
      </CButton>
    </Link>
  );
};
