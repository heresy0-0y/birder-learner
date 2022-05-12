import {
  getBirdByKey,
  getSongsByBird,
  getRunningOperationPromises,
} from "../../../common/services/birds";
import { wrapper } from "../../../store/store";
import Songs from "../[id]";

export default Songs;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.name;
    if (id.length > 4) {
      store.dispatch(getBirdByKey.initiate(id));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
