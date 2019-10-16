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
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Author } from "src/app/models/Author";
import { ValidateAuthorList } from "src/app/components/authors/authors.validator";

@Component({
  selector: "app-editcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class EditcourseComponent implements OnInit {
  courseId: number;
  header: string = "Edit Course";
  course: EditableCourse = new EditableCourse();
  form: FormGroup;
  courseEdited;
  course$: Observable<Course>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [this.course.name, [Validators.required, Validators.maxLength(50)]],
      description: [
        this.course.description,
        [Validators.required, Validators.maxLength(500)]
      ],
      length: [this.course.length, [Validators.required, Validators.min(0)]],
      date: [this.course.date, [Validators.required]],
      authors: [this.course.authors, [Validators.required, ValidateAuthorList]]
    });
  }

  ngOnInit() {
    this.getCourseToEdit();
  }

  getCourseToEdit() {
    this.loaderService.show();
    this.courseId = +this.route.snapshot.paramMap.get("id");
    this.store.dispatch(getCourseById({ id: this.courseId }));
    this.store.pipe(select(selectSelectedCourse)).subscribe(data => {
      console.log(data);
      if (data) {
        const date = new Date(data.date);
        const yyyy = date.getFullYear();
        const MM =
          date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
        const dd =
          date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`;
        return this.form.patchValue({
          name: data.name,
          description: data.description,
          length: data.length,
          date: `${yyyy}-${MM}-${dd}`,
          authors: data.authors
        });
      }
    });
    this.loaderService.hide();
  }

  handleSubmit() {
    this.loaderService.show();
    console.log(this.form.value);
    const updatedCourse: UpdatedCourse = {
      id: this.courseId,
      date: new Date(this.form.value.date),
      ...this.form.value
    };
    this.store.dispatch(
      updateCourse({ id: updatedCourse.id, course: updatedCourse })
    );
    this.loaderService.hide();
    this.router.navigate(["/courses"]);
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
}
