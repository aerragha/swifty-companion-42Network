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
        "801d15cf5feeced3cd738783b3efe1507a254de08be022654b8b3277ddd92dda",
      client_secret:
        "49a404ad77ce0ea9018bb3cdb02136d86d5b8a393d4d8019b9c7b262d25ddbb9",
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
