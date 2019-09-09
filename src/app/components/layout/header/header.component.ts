import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  username: string = "User login";
  isLoggedIn: boolean;
  constructor(private loginService: AuthService, private router: Router) {}

  ngOnInit() {
    let user = this.loginService.returnUsername();
  }

  ngAfterContentChecked() {
    /*
    this.isLoggedIn = this.loginService.isAuthenticated();
    this.username = JSON.parse(this.loginService.getUserInfo())
      ? JSON.parse(this.loginService.getUserInfo()).user
      : "User login";
      */
  }

  onLogOff() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
    console.log("LOGGED OUT");
  }
}
