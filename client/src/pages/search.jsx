import { Layout } from "../layouts/core";
import { BirdGrid } from "../screens/BirdGrid/BirdGrid.jsx";
import { useGetBirdsByIPCountryCodeQuery } from "../common/services/birds.js";


const Search = () =>  {
  
    const { data, isLoading } = useGetBirdsByIPCountryCodeQuery();
    return (<Layout>
    <BirdGrid data={data} isLoading={isLoading}/>
  </Layout>
)};

export default Search;

