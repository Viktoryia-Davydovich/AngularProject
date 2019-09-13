import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;
  token: any;
  private baseUrl: string = "http://localhost:3004/auth";

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + "/login", {
      login: username,
      password: password
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

  getUserInfo(): any {
    return this.http.get(this.baseUrl + "/userinfo");
  }
}
