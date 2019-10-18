import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";
import { LoaderService } from "src/app/services/loader.service";
import { finalize } from "rxjs/operators";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User = { login: "", password: "" };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<{ appState }>
  ) { }

  ngOnInit() { }

  onLogin() {
    this.loaderService.show();
    this.authService.login(this.user).subscribe(data => { localStorage.setItem("this_user", data.token); this.router.navigate(["/courses"]); })
    this.loaderService.hide();
  }
}

