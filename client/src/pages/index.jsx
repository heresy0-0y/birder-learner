
import { Layout } from "../layouts/core";
import {useRouter} from 'next/router'
import { BirdGrid } from "../screens/BirdGrid/BirdGrid";
import {wrapper} from '../store/store'
import {getRunningOperationPromises, getBirdsByIPCountryCode, useGetBirdsByIPCountryCodeQuery} from '../common/services/birds'


const Index = () => {

  const { data, isLoading } = useGetBirdsByIPCountryCodeQuery();
 return ( 
  <Layout>
    <BirdGrid data={data} isLoading={isLoading}/>
  </Layout>
);
}


export default Index;
