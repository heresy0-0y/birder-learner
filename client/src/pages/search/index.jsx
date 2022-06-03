import BirdGrid from "../../screens/BirdGrid/BirdGrid";
import { wrapper } from "../../store/store";
import {
  getRunningOperationPromises,
  getBirdsByIPCountryCode,
} from "../../common/services/birds";

export default function Index() {
  return <BirdGrid></BirdGrid>;
}
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getBirdsByIPCountryCode.initiate());

  await Promise.all(getRunningOperationPromises());
  return {
    props: {},
  };
});
