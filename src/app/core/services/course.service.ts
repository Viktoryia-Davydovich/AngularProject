import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Course,
  NewCourse,
  UpdatedCourse,
  EditableCourse
} from "src/app/models/course";
import { Observable, of } from "rxjs";
import { map, tap, catchError, finalize } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private baseUrl: string = "http://localhost:3004/courses";

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getCourseList(start: number, end: number): any {
    this.loaderService.show();
    return this.http
      .get<Course[]>(`${this.baseUrl}?start=${start}&count=${end}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  searchCourses(searchedCourse: string): any {
    this.loaderService.show();
    if (!searchedCourse.trim()) {
      return of([]);
    }
    return this.http
      .get<Course[]>(`${this.baseUrl}?textFragment=${searchedCourse}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  getCourseById(id: number) {
    this.loaderService.show();
    return this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  createCourse(addedCourse: NewCourse) {
    this.loaderService.show();
    const newCourse = {
      name: addedCourse.name,
      length: addedCourse.length,
      authors: addedCourse.authors,
      date: new Date(),
      description: addedCourse.description
    };
    return this.http
      .post(`${this.baseUrl}`, newCourse)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  deleteCourse(courseId: number) {
    this.loaderService.show();
    return this.http
      .delete(`${this.baseUrl}/${courseId}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  updateCourse(courseId: number, updatedCourse: UpdatedCourse) {
    this.loaderService.show();
    return this.http
      .put(`${this.baseUrl}/${courseId}`, updatedCourse)
      .pipe(finalize(() => this.loaderService.hide()));
  }
}
