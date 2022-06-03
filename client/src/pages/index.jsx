import { useEffect } from "react";
import Home from "../screens/Home/Home";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  }, []);
  return <Home></Home>;
};

export default Index;
