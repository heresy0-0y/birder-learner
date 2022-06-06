import axios, { AxiosRequestConfig } from "axios";
const filter = (raw, unallowed) => {
  return Object.keys(raw)
    .filter((key) => !unallowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
};

const handler = async () => {
  const { endpoint } = req.query;

  if (endpoint == null || endpoint == "") {
    const err = {
      error: "Missing endpoint param",
    };
    res.status(400).send(err);
    return;
  }

  if (!isNan(parseInt(endpoint)) || typeof endpoint !== "string") {
    const err = {
      error: "Endpoint param must be a string",
    };
    res.status(400).send(err);
    return;
  }

  try {
    const reqConfig = {
      url: endpoint,
      method: "get",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      params: filter({ ...req.query }, ["endpoint"]),
    };
    console.log(reqConfig.params);
    const endpointReq = await axios(reqConfig);
    const endpointRes = await endpointReq.data;

    res.status(200).send(endpointRes);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
