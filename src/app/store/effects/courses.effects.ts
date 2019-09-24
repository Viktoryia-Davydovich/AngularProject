import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {CourseService} from '../../core/services/course.service'
import { Course } from 'src/app/models/Course';
 
@Injectable()
export class CoursesEffects {
 
  constructor(
    private actions: Actions,
    private courseService: CourseService
  ) {}

  @Effect()
  loadCourses = (start, end) => this.actions.pipe(
    ofType('List courses'),
    mergeMap(() => this.courseService.getCourseList(start, end)
      .pipe(
        map((courselist: Course[]) => {
            courselist = courselist.map(course => {
                course.date = new Date(course.date);
                return course;
              })
            return { type: 'Courses loaded', payload: courselist }}
        )
      ))
    )
}