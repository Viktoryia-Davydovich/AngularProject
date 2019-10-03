import { Injectable } from "@angular/core";
import { Action, createAction, props, union } from "@ngrx/store";
import { Course, NewCourse, EditableCourse } from "../../models/Course";
import { User, LoggedUser } from "src/app/models/User";

// this is handled by effects
export const login = createAction(
  "[Login Page] Login",
  props<{ loggingUser: User }>()
);

// these are handled by reducer
export const assignLoggedUser = createAction(
  "[Login Page] Assign logged user",
  props<{ loggedUser: LoggedUser }>()
);

export const logout = createAction("[Login Page] Login");

const all = union({
  login, 
  logout,
  assignLoggedUser
})

export type AuthActions = typeof all;
