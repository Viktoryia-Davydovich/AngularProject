import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { Course, EditableCourse } from "../../../../models/course";
import { ChangeDetectionStrategy } from "@angular/core";
import { DataBindingService } from "src/app/core/services/data-binding.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleted = new EventEmitter<number>();

  constructor(private dataBinder: DataBindingService, private router: Router) {}

  ngOnInit() {}

  delete(courseId: number) {
    this.deleted.emit(courseId);
  }

  editCourse(course: Course) {
    const editableCourse = new EditableCourse();
    editableCourse.id = course.id;
    editableCourse.title = course.title;
    editableCourse.description = course.description;
    editableCourse.duration = course.duration;
    editableCourse.date = course.creationDate;
    editableCourse.header = "Edit Course";
    this.dataBinder.sendCourseToEdit(editableCourse);
    this.router.navigateByUrl("/courses/" + this.course.id);
  }
}
