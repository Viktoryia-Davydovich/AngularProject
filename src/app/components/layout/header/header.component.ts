import { Component, OnInit, NgModule, ChangeDetectorRef } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store, select } from "@ngrx/store";
import { getUserInfo, logout } from "src/app/store/actions/auth.actions";
import {
  selectUserInfo,
  AppState
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
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem("this_user")) {
      this.isLoggedIn = true;
      this.updateUserInfo();
    }
  }

  updateUserInfo() {
    this.loaderService.show();
    this.store.dispatch(getUserInfo());
    this.userInfo$ = this.store.pipe(select(selectUserInfo));
    this.userInfo$.subscribe(data => {
      if (data) {
        console.log("data")
        this.username = data.name.first + " " + data.name.last;
      }
    });
    this.loaderService.hide();
  }

  onLogOff() {
    this.store.dispatch(logout());
    this.isLoggedIn = false;
    this.username = "User login";
    this.router.navigate(["/login"]);
  }
}
