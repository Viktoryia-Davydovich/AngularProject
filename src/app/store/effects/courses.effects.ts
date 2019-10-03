import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, mergeMap, catchError, exhaustMap } from "rxjs/operators";
import { CourseService } from "../../core/services/course.service";
import { Course } from "src/app/models/Course";
import { Store, Action } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import {
  listCourses,
  CoursesActions,
  getCourselist,
  onFoundCourseById
} from "../actions/courses.actions";
import { Observable } from "rxjs";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions<CoursesActions>,
    private courseService: CourseService,
    private store: Store<IAppState>
  ) {}

  @Effect()
  loadCourses$ = () =>
    this.actions$.pipe(
      ofType("[Courselist Page] Get courselist"),
      exhaustMap(action =>
        this.courseService.getCourseList(action.start, action.end).pipe(
          map((courselist: Course[]) => {
            courselist = courselist.map(course => {
              course.date = new Date(course.date);
              return course;
            });
            return listCourses({ courses: courselist });
          })
        )
      )
    );

  @Effect()
  addCourse$ = () =>
    this.actions$.pipe(
      ofType("[Courselist Page] Add"),
      exhaustMap(action =>
        this.courseService
          .createCourse(action.course)
          .pipe(map(() => getCourselist({ start: 0, end: 3 })))
      )
    );

  @Effect()
  deleteCourse$ = () =>
    this.actions$.pipe(
      ofType("[Courselist Page] Delete"),
      exhaustMap(action =>
        this.courseService
          .deleteCourse(action.id)
          .pipe(map(() => getCourselist({ start: 0, end: 3 })))
      )
    );

  @Effect()
  updateCourse$ = () =>
    this.actions$.pipe(
      ofType("[Courselist Page] Update"),
      exhaustMap(action =>
        this.courseService
          .updateCourse(action.id, action.course)
          .pipe(map(() => getCourselist({ start: 0, end: 3 })))
      )
    );

  @Effect()
  findCourses$ = () =>
    this.actions$.pipe(
      ofType("[Courselist Page] Find"),
      exhaustMap(action =>
        this.courseService
          .searchCourses(action.searchString)
          .pipe(map(() => getCourselist({ start: 0, end: 3 })))
      )
    );

  @Effect()
  getCourseById$ = () =>
    this.actions$.pipe(
      ofType("[Courselist Page] By id"),
      exhaustMap(action =>
        this.courseService
          .getCourseById(action.id)
          .pipe(
            map((foundCourse: Course) =>
              onFoundCourseById({ foundCourseById: foundCourse })
            )
          )
      )
    );
}
