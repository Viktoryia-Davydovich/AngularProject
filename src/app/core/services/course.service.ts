import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Course,
  NewCourse,
  UpdatedCourse,
  EditableCourse
} from "src/app/models/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private baseUrl: string = "http://localhost:3004/courses";
  courses: Course[];

  constructor(private http: HttpClient) {}

  getCourseList(): any {
    return this.http.get<Course[]>(this.baseUrl);
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
