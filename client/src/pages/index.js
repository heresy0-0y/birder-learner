import { Layout } from "../layouts/core";
import { BirdGrid } from "../screens/BirdGrid/BirdGridQueryInternal";
import {wrapper} from '../store/store'
import {getBirdsByIPCountryCode, getRunningOperationPromises} from '../common/services/birds'


const Index = () => (
  <Layout>
    <BirdGrid />
  </Layout>
);


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const code = context.params?.code
    if (typeof code === "string") {

      store.dispatch(getBirdsByIPCountryCode.initiate())
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  }
);

export default Index;
