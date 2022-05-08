import { Layout } from "../../layouts/core/";
import { BirdFocus } from "../../screens/BirdFocus/BirdFocus";
import {ApiKeyManager} from '@esri/arcgis-rest-request'

export default function Songs() {
  const apiKey = process.env.ARCGIS_API_KEY
  console.log(apiKey)
  const authentication = ApiKeyManager.fromKey(apiKey)
  return (
    <Layout>
      <BirdFocus auth={authentication} />
    </Layout>
  );
}
