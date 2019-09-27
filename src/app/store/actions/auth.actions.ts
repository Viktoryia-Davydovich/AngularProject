import { Injectable } from "@angular/core";
import { Action, createAction, props } from "@ngrx/store";
import { Course, NewCourse, EditableCourse } from "../../models/Course";
import { User } from 'src/app/models/User';


export const login = createAction(
  '[Login Page] Login',
  props<{login: string, password: string}>()
);

export const logout = createAction(
  '[Login Page] Login'
);
