import { Component, OnInit, Input } from "@angular/core";
import { UpdatedCourse, EditableCourse } from "src/app/models/Course";
import { CourseService } from "src/app/core/services/course.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-editablecourse",
  templateUrl: "./editablecourse.component.html",
  styleUrls: ["./editablecourse.component.css"]
})
export class EditablecourseComponent implements OnInit {
  course: EditableCourse = {
    title: "",
    description: "",
    duration: 0,
    date: null,
    authors: "",
    header: ""
  };

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    const course_id = +this.router.url.split("/courses/")[1];
    if (!Number.isNaN(course_id) && typeof course_id === "number") {
      console.log(course_id);
      const course_edited = this.courseService.getCourseById(course_id);
      this.course = { ...course_edited, header: "Edit Course" };
    } else if (Number.isNaN(course_id)) {
      this.course.header = "New Course";
    }
  }

  handleSubmit() {
    if (this.course.id !== undefined) {
      let updatedCourse = new UpdatedCourse();
      updatedCourse = Object.assign(updatedCourse, this.course);
      this.courseService.updateCourse(updatedCourse);
      this.router.navigate(["/courses"]);
    } else {
      this.courseService.createCourse(this.course);
      this.router.navigate(["/courses"]);
    }
  }
}
