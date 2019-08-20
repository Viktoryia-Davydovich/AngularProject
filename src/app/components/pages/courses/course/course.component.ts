import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { Course } from "../../../../models/course";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleted = new EventEmitter<number>();

  constructor() {}

  // 1st
  ngOnChanges() {
    console.log("1 - OnChanges hook from COURSE component");
  }

  ngOnInit() {}

  delete(courseId: number) {
    this.deleted.emit(courseId);
  }
}
