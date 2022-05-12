import { wrapper } from "../../../store/store";
import Songs from "../[id]";
import { Layout } from "../../layouts/core/";
import { BirdFocus } from "../../screens/BirdFocus/BirdFocus";

export default function Songs() {
  return (
    <Layout>
      <BirdFocus />
    </Layout>
  );
}
import {
  getBirdByKey,
  getSongsByBird,
  getRunningOperationPromises,
} from "../../../common/services/birds";

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
