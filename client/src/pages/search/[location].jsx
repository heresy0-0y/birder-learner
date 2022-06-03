import dynamic from "next/dynamic";
import { wrapper } from "../../store/store";
import {
  getRunningOperationPromises,
  getBirdsByCoords,
} from "../../common/services/birds";

const Search = () => {
  const BirdGrid = dynamic(() => import("../../screens/BirdGrid/BirdGrid"), {
    ssr: true,
  });
  return <BirdGrid></BirdGrid>;
};

export default Search;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const location = context.params?.location;
    if (location) {
      const coords = JSON.parse(location);
      store.dispatch(getBirdsByCoords.initiate(coords));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
