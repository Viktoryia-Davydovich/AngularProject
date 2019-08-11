import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

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
    this.isLoggedIn = this.loginService.IsAuthenticated();
  }

  onLogOff() {
    if (this.loginService.IsAuthenticated()) {
      this.loginService.Logout();
      console.log("LOGGED OUT");
    }
  }
}
