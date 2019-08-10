import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  Login(username, password) {
    const user = {
      user: username,
      password: password,
      token: "fake-token"
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  Logout() {
    localStorage.removeItem("user");
  }

  IsAuthenticated() {
    if (localStorage.getItem("user")) {
      return true;
    }
    return false;
  }

  GetUserInfo() {
    const user = localStorage.getItem("user");
    return user;
  }
}
