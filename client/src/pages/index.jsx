
import { Layout } from "../layouts/core";
import {useRouter} from 'next/router'
import BirdGrid  from "../screens/BirdGrid/BirdGrid";
import dynamic from 'next/dynamic'


const Index = () => {
const BirdGrid = dynamic(() => import("../screens/BirdGrid/BirdGrid"), { ssr: false });

 return ( 
  <Layout>
    <BirdGrid />
  </Layout>
);
}


export default Index;
