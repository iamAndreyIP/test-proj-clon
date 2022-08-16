import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./baseAPI";

const loginAPI = new HTTPTransport();

export default class LoginAPI extends BaseAPI {
  //
  static API_URL = "https://ya-praktikum.tech/api/v2";

  async loginUser(data) {
    const url = LoginAPI.API_URL + "/auth/signin";
    return await loginAPI.post(url, {
      data: JSON.stringify(data),
      mode: "cors",
      headers: { "Content-type": "application/json" },
    });
  }
}
