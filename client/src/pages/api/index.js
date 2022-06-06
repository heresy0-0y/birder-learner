import axios from "axios";
const BASE_URL = `https://api.geoapify.com/v1/`;
const KEY = process.env.GEOAPIFY_API_KEY;

export default async function handler(req, res) {
  const method = req.method;
  const url = req.url.slice(6);
  const body = req.body;
  const reqConfig = {};
  reqConfig.url = `${BASE_URL}${url}&apiKey=${KEY}`;

  if (method === "POST") {
    reqConfig.method = "POST";
    reqConfig.data = body;
  } else {
    reqConfig.method = "GET";
  }

  try {
    const response = await axios(reqConfig);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}
