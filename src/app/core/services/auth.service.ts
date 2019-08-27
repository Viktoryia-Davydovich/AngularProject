import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;
  users: User[];

  constructor() {
    this.users = [
      { id: 1, login: "qwerty1@gmail.com", password: "qwerty2" },
      { id: 1, login: "qwerty2@gmail.com", password: "qwerty2" },
      { id: 1, login: "qwerty2@gmail.com", password: "qwerty2" }
    ];
  }

  login(username: string, password: string) {
    if (
      this.users.find(c => c.login === username) &&
      this.users.find(c => c.password === password)
    ) {
      const this_user = {
        user: username,
        token: "fake-token"
      };
      localStorage.setItem("user", JSON.stringify(this_user.token));
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    if (localStorage.getItem("this_user")) {
      return true;
    }
    return false;
  }

  getUserInfo() {
    const user = localStorage.getItem("user");
    return user;
  }
}
