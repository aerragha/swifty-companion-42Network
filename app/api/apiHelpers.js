import axios from "axios";
import querystring from "querystring";

export const Api = (token) => {
  let data = {
    baseURL: "https://api.intra.42.fr/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  if (token) data.headers["Authorization"] = "Bearer " + token;

  return axios.create(data);
};

export const generateToken = () =>
  new Promise((resolve, reject) => {
    const credentials = {
      grant_type: "client_credentials",
      client_id:
        "--- client ID ---",
      client_secret:
        "--- client_secret ---",
    };
    Api()
      .post("/oauth/token", querystring.stringify(credentials))
      .then((res) => resolve(res.data.access_token))
      .catch((err) => reject(err.response.data));
  });

export const checkToken = (token) =>
  new Promise((resolve, reject) => {
    Api(token)
      .get("/oauth/token/info")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => resolve(err.response.data));
  });

export const getUserData = (login, token) =>
  new Promise((resolve, reject) => {
    Api(token)
      .get(`/v2/users/${login}`)
      .then((res) => {
        resolve({ status: "success", data: res.data });
      })
      .catch((err) => {
        if (err.response.status === 404)
          resolve({ status: "failure", msg: "User not found" });
        else resolve({ status: "failure", msg: "Error" });
      });
  });
