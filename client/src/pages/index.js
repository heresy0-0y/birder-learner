import { Link as ChakraLink, Text, Code } from "@chakra-ui/react";
import {BirdGrid} from '../screens/BirdGrid/BirdGrid.jsx'
import { Layout } from "../layouts/core";

const Index = () => (
  <Layout>
    <Text>
      <Code>bird</Code>
    </Text>
    <BirdGrid/>
  </Layout>
);

export default Index;
