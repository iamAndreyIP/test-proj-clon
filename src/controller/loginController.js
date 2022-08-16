import LoginAPI from "../api/loginAPI";

export default class LoginController {
  async login(data) {
    //api request (data) -> login api post url (data)
    try {
      console.log(new LoginAPI().loginUser(data));
    } catch (error) {
      console.log(error);
    }
  }

  async logOut() {
    //api request (data) -> login api post url (data) cookie set headers exirsise 0
  }
}

export class RegistrationController {
  async registration(data) {
    //request -> reg api post data return created data
  }
}
