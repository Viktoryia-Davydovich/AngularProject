import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;

  constructor() {}

  login(username: string, password: string) {
    const user = {
      user: username,
      password: password,
      token: "fake-token"
    };
    localStorage.setItem("user", JSON.stringify(user.token));
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    if (localStorage.getItem("user")) {
      return true;
    }
    return false;
  }

  getUserInfo() {
    const user = localStorage.getItem("user");
    return user;
  }
}
