import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, mergeMap, catchError, exhaustMap, tap } from "rxjs/operators";
import { CourseService } from "../../core/services/course.service";
import { Course } from "src/app/models/Course";
import { Store, Action } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { AuthService } from "src/app/core/services/auth.service";
import { AuthActions, assignUserInfo } from "../actions/auth.actions";
import { Router } from "@angular/router";
import { LoggedUser } from "src/app/models/User";
import { AppState } from "../selectors/app.selector";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<AuthActions>,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  @Effect()
  getUserInfo$ = () =>
    this.actions$.pipe(
      ofType("[Login Page] Get user info"),
      exhaustMap(() =>
        this.authService.getUserInfo().pipe(
          map((data: any) => {
            const userInfo: LoggedUser = { ...data };
            console.log(userInfo);
            return assignUserInfo({ userInfo: userInfo });
          })
        )
      )
    );
}
