import { makeStore, wrapper } from "../../store/store";
import {
  getRunningOperationPromises,
  getFavorites,
  getUsers,
} from "../../common/services/auth";
import BirdGrid from "../../screens/BirdGrid/BirdGrid";

const Favorites = () => <BirdGrid></BirdGrid>;

export default Favorites;
export async function getStaticPaths() {
  const store = makeStore();
  store.dispatch(getUsers.initiate()).then((result) => {
    return {
      paths: result.data.map((p) => `/${p}/favorites`),
      fallback: true,
    };
  });
}
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getFavorites.initiate());

  await Promise.all(getRunningOperationPromises());
  return {
    props: {},
  };
});
