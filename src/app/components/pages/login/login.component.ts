import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { User } from 'src/app/models/User';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() user: User = {login: "", password : ""};

  constructor(private loginService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.loginService.login(this.user).subscribe(data => {
      localStorage.setItem("this_user", data.token);
      this.router.navigate(["/courses"]);
    });
  }
}
