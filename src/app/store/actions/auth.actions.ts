import { Injectable } from "@angular/core";
import { Action, createAction, props, union } from "@ngrx/store";
import { Course, NewCourse, EditableCourse } from "../../models/Course";
import { User, LoggedUser } from "src/app/models/User";

// this is handled by effects
export const login = createAction(
  "[Login Page] Login",
  props<{ loggingUser: User }>()
);

export const getUserInfo = createAction("[Login Page] Get user info");

// these are handled by reducer

export const onLogin = createAction(
  "[Login Page] On login",
  props<{ authenticated: boolean }>()
);

export const assignUserInfo = createAction(
  "[Login Page] Assign user info",
  props<{ userInfo: LoggedUser }>()
);

export const logout = createAction("[Login Page] Logout");

const all = union({
  login,
  logout,
  onLogin,
  assignUserInfo
});

export type AuthActions = typeof all;
