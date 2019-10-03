import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader.service";
import { finalize } from "rxjs/operators";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { getUserInfo } from "src/app/store/actions/auth.actions";
import {
  selectActiveUser,
  selectUserInfo
} from "src/app/store/selectors/app.selector";
import { Observable } from "rxjs";
import { LoggedUser } from "src/app/models/User";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  username: string = "User login";
  userInfo: Observable<LoggedUser>;
  isLoggedIn: boolean;
  constructor(
    private loginService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.store.dispatch(getUserInfo());
    this.userInfo = this.store.pipe(select(selectUserInfo));
    this.loaderService.hide();
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
