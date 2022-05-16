import dynamic from "next/dynamic";
import { wrapper } from "../../store/store";
import {
  getRunningOperationPromises,
  getBirdsByIPCountryCode,
  useGetBirdsByIPCountryCodeQuery,
} from "../../common/services/birds";

const Search = () => {
  const BirdGrid = dynamic(() => import("../../screens/BirdGrid/BirdGrid"), {
    ssr: true,
  });
  return <BirdGrid></BirdGrid>;
};

export default Search;
