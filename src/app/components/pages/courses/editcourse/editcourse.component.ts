import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/core/services/course.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EditableCourse, UpdatedCourse, Course } from "src/app/models/Course";
import { LoaderService } from "src/app/core/services/loader.service";
import { finalize } from "rxjs/operators";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import {
  updateCourse,
  getCourseById
} from "src/app/store/actions/courses.actions";
import {
  selectSelectedCourse,
  AppState
} from "src/app/store/selectors/app.selector";
import { Observable } from "rxjs";

@Component({
  selector: "app-editcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class EditcourseComponent implements OnInit {
  course: EditableCourse;
  course$: Observable<Course>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loaderService.show();
    const course_id = +this.route.snapshot.paramMap.get("id");
    this.store.dispatch(getCourseById({ id: course_id }));
    this.course$ = this.store.pipe(select(selectSelectedCourse));
    this.course$.subscribe(
      data => (this.course = { ...data, header: "Edit Course" })
    );
    this.loaderService.hide();
  }

  handleSubmit() {
    this.loaderService.show();
    let updatedCourse = new UpdatedCourse();
    updatedCourse = Object.assign(updatedCourse, this.course);
    this.store.dispatch(
      updateCourse({ id: updatedCourse.id, course: updatedCourse })
    );
    this.loaderService.hide();
    this.router.navigate(["/courses"]);
  }
}
