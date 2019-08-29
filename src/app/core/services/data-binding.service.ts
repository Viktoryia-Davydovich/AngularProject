import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { EditableCourse } from "src/app/models/Course";

@Injectable({
  providedIn: "root"
})
export class DataBindingService {
  dataSource = new Subject<EditableCourse>();
  courseToEdit$ = this.dataSource.asObservable();

  constructor() {}

  sendCourseToEdit(course: EditableCourse) {
    this.dataSource.next(course);
  }
}
