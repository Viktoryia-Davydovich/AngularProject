// Section 1
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Course, NewCourse, EditableCourse } from "../../models/Course";

export const NEW_COURSE = "New course";
export const DELETE_COURSE = "Delete course";
export const UPDATE_COURSE = "Update course";
export const LIST_COURSES = "List courses";
export const FIND_COURSE = "Find course";
export const GET_COURSE_BY_ID = "Get course by id";

export class AddCourse implements Action {
  readonly type = NEW_COURSE;

  constructor(public payload: EditableCourse) {}
}

export class DeleteCourse implements Action {
  readonly type = DELETE_COURSE;

  constructor(public payload: number) {}
}

export class UpdateCourse implements Action {
  readonly type = UPDATE_COURSE;

  constructor(public payloadId: number, public payload: EditableCourse) {}
}

export class ListCourses implements Action {
  readonly type = LIST_COURSES;

  constructor() {}
}

export class FindCourse implements Action {
  readonly type = FIND_COURSE;

  constructor(public payload: string) {}
}

export class GetCourseById implements Action {
  readonly type = GET_COURSE_BY_ID;

  constructor(public payload: number) {}
}

export type Actions =
  | AddCourse
  | DeleteCourse
  | UpdateCourse
  | ListCourses
  | FindCourse
  | GetCourseById;
