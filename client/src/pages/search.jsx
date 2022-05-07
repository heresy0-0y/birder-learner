import { Layout } from "../layouts/core";
import { BirdGrid } from "../screens/BirdGrid/BirdGrid";

import {wrapper} from '../store/store'
import {getRunningOperationPromises, getBirdsByIPCountryCode, useGetBirdsByIPCountryCodeQuery} from '../common/services/birds'


const Search = () =>  {

    return (<Layout>
    <BirdGrid/>
  </Layout>
)};

export default Search;

