import { Component, OnInit, Input } from "@angular/core";
import { UpdatedCourse, EditableCourse } from "src/app/models/Course";
import { DataBindingService } from "src/app/core/services/data-binding.service";
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

  constructor(
    private dataBinding: DataBindingService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnChanges() {}

  ngOnInit() {
    this.dataBinding.courseToEdit$.subscribe(course => {
      Object.assign(this.course, course);
      console.log("OBSERVABLE " + this.course);
    });
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
