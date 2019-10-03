import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, mergeMap, catchError, exhaustMap } from "rxjs/operators";
import { CourseService } from "../../core/services/course.service";
import { Course } from "src/app/models/Course";
import { Store, Action } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { AuthService } from "src/app/core/services/auth.service";
import {
  assignLoggedUser,
  AuthActions,
  assignUserInfo
} from "../actions/auth.actions";
import { Router } from "@angular/router";
import { LoggedUser } from "src/app/models/User";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<AuthActions>,
    private authService: AuthService,
    private store: Store<IAppState>,
    private router: Router
  ) {}

  @Effect()
  login$ = () =>
    this.actions$.pipe(
      ofType("[Login Page] Login"),
      exhaustMap(action =>
        this.authService.login(action.loggingUser).pipe(
          map(data => {
            localStorage.setItem("this_user", data.token);
            assignLoggedUser({ loggedUser: data });
            this.router.navigate(["/courses"]);
          })
        )
      )
    );

  @Effect()
  getUserInfo$ = () =>
    this.actions$.pipe(
      ofType("[Login Page] Get user info"),
      exhaustMap(() =>
        this.authService.getUserInfo().pipe(
          map((userInfo: LoggedUser) => {
            assignUserInfo({ userInfo: userInfo });
          })
        )
      )
    );
}
