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

  constructor(private http: HttpClient) {}

  getCourseList(start: number, end: number): any {
    return this.http.get<Course[]>(
      `${this.baseUrl}?start=${start}&count=${end}`
    );
  }

  searchCourses(start: number, end: number, searchedCourse: string): any {
    if (!searchedCourse.trim()) {
      return of([]);
    }
    return this.http.get<Course[]>(
      `${this.baseUrl}?start=${start}&count=${end}&textFragment=${searchedCourse}`
    );
  }

  getCourseById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCourse(addedCourse: NewCourse) {
    const newCourse = {
      name: addedCourse.name,
      length: addedCourse.length,
      authors: addedCourse.authors,
      date: new Date(),
      description: addedCourse.description
    };
    return this.http.post(`${this.baseUrl}`, newCourse);
  }

  deleteCourse(courseId: number) {
    return this.http.delete(`${this.baseUrl}/${courseId}`);
  }

  updateCourse(courseId: number, updatedCourse: UpdatedCourse) {
    return this.http.put(`${this.baseUrl}/${courseId}`, updatedCourse);
  }
}
