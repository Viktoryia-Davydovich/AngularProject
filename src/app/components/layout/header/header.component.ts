import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader.service";
import { finalize } from "rxjs/operators";
import { pipe } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  username: string = "User login";
  isLoggedIn: boolean;
  constructor(
    private loginService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loginService
      .getUserInfo()
      .subscribe(
        user => (this.username = user.name.first + " " + user.name.last)
      )
  }

  ngAfterContentChecked() {
    this.isLoggedIn = this.loginService.isAuthenticated();
  }

  onLogOff() {
    this.loginService.logout();
    this.username = "User login";
    this.router.navigate(["/login"]);
    console.log("LOGGED OUT");
  }
}
