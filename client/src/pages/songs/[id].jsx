import { wrapper } from "../../store/store";
import { BirdFocus } from "../../screens/BirdFocus/BirdFocus";
import {
  getBirdByKey,
  getSongsByBird,
  getRunningOperationPromises,
} from "../../common/services/birds";

export default function Songs() {
  return <BirdFocus></BirdFocus>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.name;
    if (id?.length > 4) {
      store.dispatch(getBirdByKey.initiate(id));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
