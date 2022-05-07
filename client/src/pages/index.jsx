
import { Layout } from "../layouts/core";
import {useRouter} from 'next/router'
import { BirdGrid } from "../screens/BirdGrid/BirdGrid";



const Index = () => {


 return ( 
  <Layout>
    <BirdGrid />
  </Layout>
);
}


export default Index;
