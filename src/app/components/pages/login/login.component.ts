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
    this.loginService.Login(this.login, this.password);
    if (this.loginService.IsAuthenticated()) {
      let user = JSON.parse(this.loginService.GetUserInfo());
      console.log(`${user.user} IS LOGGED IN`);
    }
  }
}
