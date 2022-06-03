import { wrapper } from "../../../store/store";
import { BirdFocus } from "../../../screens/BirdFocus/BirdFocus";

import {
  getBirdByKey,
  getSongsByBird,
  getRunningOperationPromises,
} from "../../../common/services/birds";

export default function Songs() {
  return <BirdFocus></BirdFocus>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const taxonKey = context.params?.taxonKey;
    const id = context.params?.id;
    if (id?.length > 4 && id !== undefined) {
      store.dispatch(getBirdByKey.initiate(id));
    }

    if (taxonKey?.length > 5 && taxonKey !== undefined) {
      store.dispatch(getSongsByBird.initiate(taxonKey));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
