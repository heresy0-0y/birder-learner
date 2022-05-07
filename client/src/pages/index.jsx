
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

export const getStatic = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(getBirdsByIPCountryCode.initiate)


    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  }
)

export default Index;
