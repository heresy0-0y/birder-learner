import BirdGrid from "../screens/BirdGrid/BirdGrid";
import dynamic from "next/dynamic";
import { useGetFavoritesQuery } from "../common/services/auth";

const Index = () => {
  const BirdGrid = dynamic(() => import("../screens/BirdGrid/BirdGrid"), {
    ssr: false,
  });
  const { data } = useGetFavoritesQuery();

  return <BirdGrid></BirdGrid>;
};

export default Index;
