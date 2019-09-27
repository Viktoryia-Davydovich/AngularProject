import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() user: User = {login: "", password : ""};

  constructor(private loginService: AuthService, private router: Router, private loaderService: LoaderService) {}

  ngOnInit() {}

  onLogin() {
    this.loaderService.show()
    this.loginService.login(this.user)
    .pipe(finalize(() => this.loaderService.hide()))
    .subscribe(data => {
      localStorage.setItem("this_user", data.token);
      this.router.navigate(["/courses"]);
    });
  }
}
