import { Component, OnInit, Input } from "@angular/core";
import { Course } from "src/app/models/Course";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/core/services/course.service";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-edit-course.component.html",
  styleUrls: ["./add-edit-course.component.css"]
})
export class AddCourseComponent implements OnInit {
  editedCourse: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = +params.get("id");
      this.editedCourse = this.courseService.getCourseById(id);
    });
  }

  updateCourse() {
    this.courseService.updateCourse(this.editedCourse);
  }
}
