import { Component, OnInit } from "@angular/core";
import { EditableCourse, NewCourse } from "src/app/models/Course";
import { CourseService } from "src/app/core/services/course.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { addCourse } from "src/app/store/actions/courses.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppState } from "src/app/store/selectors/app.selector";
import { ValidateAuthorList } from "src/app/components/authors/authors.validator";

@Component({
  selector: "app-addcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class AddcourseComponent implements OnInit {
  header: string = "New Course";
  form: FormGroup;
  course: EditableCourse;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      length: [0, [Validators.required], Validators.min(0)],
      date: [null, [Validators.required]],
      authors: [[], [Validators.required, ValidateAuthorList]]
    });
  }

  get name() {
    return this.form.get("name");
  }

  get description() {
    return this.form.get("description");
  }

  get length() {
    return this.form.get("length");
  }

  get date() {
    return this.form.get("date");
  }

  get authors() {
    return this.form.get("authors");
  }

  handleSubmit() {
    console.log(this.course);
    this.loaderService.show();
    this.store.dispatch(addCourse({ ...this.form.value }));
    this.loaderService.hide();
    this.router.navigate(["/courses"]);
  }
}
