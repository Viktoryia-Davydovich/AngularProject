import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/core/services/course.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EditableCourse, UpdatedCourse } from "src/app/models/Course";
import { LoaderService } from "src/app/core/services/loader.service";
import { finalize } from "rxjs/operators";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import {
  updateCourse,
  getCourseById
} from "src/app/store/actions/courses.actions";
import { selectSelectedCourse } from "src/app/store/selectors/app.selector";
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';


@Component({
  selector: "app-editcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class EditcourseComponent implements OnInit {
  course: EditableCourse;
  form: FormGroup;
  courseEdited;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private store: Store<IAppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getCourseToEdit();

    this.form = this.fb.group({
      name: [this.course.name, [Validators.required, Validators.maxLength(50)]],
      description: [this.course.description, [Validators.required, Validators.maxLength(500)]],
      length: [this.course.length,  [Validators.required, Validators.pattern('^\d+$')]],
      date: [this.course.date, [Validators.required]],
      authors: [this.course.authors, [Validators.required]],
      header: "Edit Course"
    })
  }

  get name(){
    return this.form.get('name')
  }

  get description(){
    return this.form.get('description')
  }

  get length(){
    return this.form.get('length')
  }

  get date(){
    return this.form.get('date')
  }

  get authors(){
    return this.form.get('authors')
  }

  getCourseToEdit(){
    this.loaderService.show();
    const course_id = +this.route.snapshot.paramMap.get("id");
    this.store.dispatch(getCourseById({ id: course_id }));
    this.courseEdited = this.store.pipe(select(selectSelectedCourse));
    this.course = { ...this.courseEdited, header: "Edit Course" };
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
