import { Layout } from "../layouts/core";
import { BirdGrid } from "../screens/BirdGrid/BirdGridQueryInternal";
import {wrapper} from '../store/store'
import {getRunningOperationPromises, getBirdsByIPCountryCode} from '../common/services/birds'


const Index = () => (
  <Layout>
    <BirdGrid />
  </Layout>
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getBirdsByIPCountryCode.initiate())
    console.log(store.getState())

    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  }
)

export default Index;
