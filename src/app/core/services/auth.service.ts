import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;
  token: any;
  private baseUrl: string = "http://localhost:3004/auth";

  constructor(
    private router: Router,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {}

  login(username: string, password: string): Observable<any> {
    this.loaderService.show();
    return this.http
      .post(this.baseUrl + "/login", {
        login: username,
        password: password
      })
      .pipe(finalize(() => this.loaderService.hide()));
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
    this.loaderService.show();
    return this.http
      .get(this.baseUrl + "/userinfo")
      .pipe(finalize(() => this.loaderService.hide()));
  }
}
