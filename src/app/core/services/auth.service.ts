import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;
  users: User[] = [
    { id: 1, login: "qwerty1@gmail.com", password: "qwerty1" },
    { id: 2, login: "qwerty2@gmail.com", password: "qwerty2" },
    { id: 3, login: "qwerty3@gmail.com", password: "qwerty3" }
  ];

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (
      this.users.find(user => user.login === username) &&
      this.users.find(user => user.password === password)
    ) {
      const this_user = {
        user: username,
        token: "fake-token"
      };
      localStorage.setItem("this_user", JSON.stringify(this_user));
      this.router.navigateByUrl("/courses");
    }
  }

  logout() {
    localStorage.removeItem("this_user");
  }

  isAuthenticated() {
    if (localStorage.getItem("this_user")) {
      return true;
    }
    return false;
  }

  getUserInfo() {
    const user = localStorage.getItem("this_user");
    return user;
  }
}
