import { Layout } from "../layouts/core";
import { BirdGrid } from "../screens/BirdGrid/BirdGridQueryInternal";
import { useGetBirdsByIPCountryCodeQuery } from "../common/services/birds.js";


const Search = () =>  {

    return (<Layout>
    <BirdGrid />
  </Layout>
)};

export default Search;

