import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store, select } from "@ngrx/store";
import { getUserInfo, logout } from "src/app/store/actions/auth.actions";
import {
  selectUserInfo,
  AppState,
  selectIsAuthenticated
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
  userInfo$: Observable<LoggedUser>;
  userInfo: LoggedUser;
  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;
  constructor(
    private loginService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(selectIsAuthenticated));
    this.isLoggedIn$.subscribe(data => {
      this.isLoggedIn = data;
      this.updateUserInfo();
    });
  }

  updateUserInfo() {
    this.loaderService.show();
    this.store.dispatch(getUserInfo());
    this.userInfo$ = this.store.pipe(select(selectUserInfo));
    this.userInfo$.subscribe(data => {
      this.userInfo = data;
      this.username = this.userInfo.name.first + " " + this.userInfo.name.last;
      console.log(this.username);
    });
    this.loaderService.hide();
  }

  onLogOff() {
    this.store.dispatch(logout());
    this.username = "User login";
    this.router.navigate(["/login"]);
  }
}
