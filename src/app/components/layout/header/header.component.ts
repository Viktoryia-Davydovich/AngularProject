import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private loginService: AuthService) {}

  ngOnInit() {}

  ngAfterContentChecked() {
    this.isLoggedIn = this.loginService.isAuthenticated();
  }

  onLogOff() {
    if (this.loginService.isAuthenticated()) {
      this.loginService.logout();
      console.log("LOGGED OUT");
    }
  }
}
