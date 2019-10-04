import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Course,
  NewCourse,
  UpdatedCourse,
  EditableCourse
} from "src/app/models/course";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private baseUrl: string = "http://localhost:3004/courses";
  courses: Course[];

  constructor(private http: HttpClient) {}

  getCourseList(start: number, end: number): any {
    return this.http.get<Course[]>(
      `${this.baseUrl}?start=${start}&count=${end}`
    );
  }

  searchCourses(searchedCourse: string): any {
    if (!searchedCourse.trim()) {
      return of([]);
    }
    return this.http.get<Course[]>(
      `${this.baseUrl}?textFragment=${searchedCourse}`
    );
  }

  getCourseById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCourse(addedCourse: NewCourse) {
    const newCourse = {
      id: this.courses.length,
      name: addedCourse.name,
      length: addedCourse.length,
      authors: addedCourse.authors,
      date: new Date(),
      description: addedCourse.description
    };
    return this.http.post(`${this.baseUrl}/new`, newCourse);
  }

  deleteCourse(courseId: number): void {
    this.http.delete(`${this.baseUrl}/delete/${courseId}`);
  }

  updateCourse(updatedCourse: UpdatedCourse) {
    return this.http.put(`${this.baseUrl}/edit`, updatedCourse);
  }
}
