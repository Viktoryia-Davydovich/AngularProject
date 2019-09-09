import { Component, OnInit } from "@angular/core";
import { EditableCourse } from "src/app/models/Course";
import { CourseService } from "src/app/core/services/course.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-addcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class AddcourseComponent implements OnInit {
  course: EditableCourse;
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.course = {
      name: "",
      description: "",
      length: 0,
      date: null,
      authors: [],
      header: "New Course"
    };
  }

  handleSubmit() {
    this.courseService.createCourse(this.course);
    this.router.navigate(["/courses"]);
  }
}
