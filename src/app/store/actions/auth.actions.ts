import { Injectable } from "@angular/core";
import { Action, createAction, props, union } from "@ngrx/store";
import { Course, NewCourse, EditableCourse } from "../../models/Course";
import { User, LoggedUser } from "src/app/models/User";

// this is handled by effects

export const getUserInfo = createAction("[Login Page] Get user info");

// these are handled by reducer

export const assignUserInfo = createAction(
  "[Login Page] Assign user info",
  props<{ userInfo: LoggedUser }>()
);

export const logout = createAction("[Login Page] Logout");

const all = union({
  logout,
  assignUserInfo
});

export type AuthActions = typeof all;
