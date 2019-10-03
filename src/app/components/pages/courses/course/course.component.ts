import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { Course, EditableCourse } from "../../../../models/course";
import { ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleted = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnChanges() {}

  ngOnInit() {
    console.log(this.course);
  }

  delete(courseId: number) {
    this.deleted.emit(courseId);
  }

  editCourse() {
    this.router.navigateByUrl("/courses/" + this.course.id);
  }
}
