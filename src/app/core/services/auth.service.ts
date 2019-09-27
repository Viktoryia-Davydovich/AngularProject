import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, share, publish, refCount } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;
  token: any;
  private baseUrl: string = "http://localhost:3004/auth";

  constructor(
    private http: HttpClient,
  ) {}

  login(user: User): Observable<any> {
    return this.http
      .post(this.baseUrl + "/login", {
        login: user.login,
        password: user.password
      })
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

  getUserInfo(): any {
    return this.http
      .get(this.baseUrl + "/userinfo")
  }
}
