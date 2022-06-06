import axios from "axios";
const BASE_URL = `https://api.geoapify.com/v1`;
const KEY = process.env.GEOAPIFY_API_KEY;

export default async function handler(req, res) {
  const method = req.method;
  const url = req.url.replace(/^\/api?\?/, "");
  const body = req.body;
  const reqConfig = {};
  reqConfig.url = `${BASE_URL}${url}&apiKey=${KEY}`;
  reqConfig.timeout = 10000;

  if (method === "POST") {
    reqConfig.method = "POST";
    reqConfig.data = body;
  }

  try {
    const response = await axios(reqConfig);
    const data = await response.data;
    res.status(200).send(data);
    console.log(response);
  } catch (error) {
    console.log(error.toJSON());
    res.status(500).send(error);
  }
}
