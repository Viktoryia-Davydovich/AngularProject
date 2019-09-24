import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Course, NewCourse, EditableCourse } from "../../models/Course";
import { User } from 'src/app/models/User';

export const LOGIN = "Login";
export const LOGOUT = "Logout";

export class login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export class logout implements Action {
  readonly type = LOGOUT;

  constructor() {}
}

export type Actions =
  | login
  | logout;
