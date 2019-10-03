import { Injectable } from "@angular/core";
import { Action, createAction, props, union } from "@ngrx/store";
import { Course, NewCourse, UpdatedCourse } from "../../models/Course";

// these are handled by effects

export const addCourse = createAction(
  "[Courselist Page] Add",
  props<{ course: NewCourse }>()
);

export const deleteCourse = createAction(
  "[Courselist Page] Delete",
  props<{ id: number }>()
);

export const updateCourse = createAction(
  "[Courselist Page] Update",
  props<{ id: number; course: UpdatedCourse }>()
);

export const getCourseById = createAction(
  "[Courselist Page] By id",
  props<{ id: number }>()
);

export const findCourses = createAction(
  "[Courselist Page] Find",
  props<{ searchString: string }>()
);

export const getCourselist = createAction(
  "[Courselist Page] Get courselist",
  props<{ start: number; end: number }>()
);

// these are handled by reducer

export const listCourses = createAction(
  "[Courselist Page] List",
  props<{ courses: Course[] }>()
);

export const onFoundCourseById = createAction(
  "[Courselist Page] On course found by id",
  props<{ foundCourseById: Course }>()
);

const all = union({
  addCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
  findCourses,
  getCourselist,
  listCourses,
  onFoundCourseById
});

export type CoursesActions = typeof all;
