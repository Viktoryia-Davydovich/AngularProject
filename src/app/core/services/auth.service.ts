import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;
  token: any;
  private baseUrl: string = "http://localhost:3004/auth";

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string) {
    this.http
      .post(this.baseUrl + "/login", {
        login: username,
        password: password
      })
      .subscribe(token => {
        this.token = token;
        localStorage.setItem("this_user", this.token);
        this.router.navigateByUrl("/courses");
      });
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
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Basic ${btoa(localStorage.getItem("this_user"))}`
      )
    };

    return this.http.post(this.baseUrl + "/userinfo", header);
  }
}
