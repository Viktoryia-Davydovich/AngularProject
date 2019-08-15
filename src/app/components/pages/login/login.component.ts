import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() login: string;
  @Input() password: string;

  constructor(private loginService: AuthService) {}

  ngOnInit() {}

  onLogin() {
    this.loginService.login(this.login, this.password);
    if (this.loginService.isAuthenticated()) {
      let user = JSON.parse(this.loginService.getUserInfo());
      console.log(`${user.user} IS LOGGED IN`);
    }
  }
}
