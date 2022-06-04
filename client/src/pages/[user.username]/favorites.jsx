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
  const result = await store.dispatch(getUsers.initiate());
  console.log(result);
  return {
    paths: result.data?.results.map((user) => ({
      params: { "user.username": user },
    })),
    fallback: true,
  };
}
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getFavorites.initiate());

  await Promise.all(getRunningOperationPromises());
  return {
    props: {},
  };
});
