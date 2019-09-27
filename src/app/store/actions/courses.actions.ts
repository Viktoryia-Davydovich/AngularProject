import { Injectable } from "@angular/core";
import { Action, createAction, props } from "@ngrx/store";
import { Course, NewCourse, EditableCourse, UpdatedCourse } from "../../models/Course";


export const addCourse = createAction(
  '[Courselist Page] Add',
  props<{course: NewCourse}>()
);

export const deleteCourse = createAction(
  '[Courselist Page] Delete',
  props<{id: number}>()
);


export const updateCourse = createAction(
  '[Courselist Page] Update',
  props<{course: UpdatedCourse}>()
);

export const listCourses = createAction(
  '[Courselist Page] List',
  props<{courses: Course[]}>()
);


export const findCourse = createAction(
  '[Courselist Page] Find',
  props<{searchString: string}>()
);

export const getCourseById = createAction(
  '[Courselist Page] By id',
  props<{id: number}>()
);
