import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/core/services/course.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EditableCourse, UpdatedCourse } from "src/app/models/Course";
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-editcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class EditcourseComponent implements OnInit {
  course: EditableCourse;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show()
    const course_id = +this.route.snapshot.paramMap.get("id");
    let course_edited;
    this.courseService.getCourseById(course_id)
    .pipe(finalize(() => this.loaderService.hide()))
    .subscribe(course => {
      course_edited = course;
      console.log(course_edited.date);
      this.course = { ...course_edited, header: "Edit Course" };
    });
  }

  handleSubmit() {
    this.loaderService.show()
    let updatedCourse = new UpdatedCourse();
    updatedCourse = Object.assign(updatedCourse, this.course);
    this.courseService
      .updateCourse(updatedCourse.id, updatedCourse)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe();
    this.router.navigate(["/courses"]);
  }
}
