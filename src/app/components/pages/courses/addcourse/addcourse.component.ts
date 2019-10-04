import { Component, OnInit } from "@angular/core";
import { EditableCourse, NewCourse } from "src/app/models/Course";
import { CourseService } from "src/app/core/services/course.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { addCourse } from "src/app/store/actions/courses.actions";
import {FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: "app-addcourse",
  templateUrl: "../editablecourse/editablecourse.component.html",
  styleUrls: ["../editablecourse/editablecourse.component.css"]
})
export class AddcourseComponent implements OnInit {
  form: FormGroup;
  course: EditableCourse;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<IAppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: "",
      description: "",
      length: 0,
      date: null,
      authors: [],
      header: "New Course"
    })

    this.form.valueChanges.subscribe()
    /*
    this.course = {
      name: "",
      description: "",
      length: 0,
      date: null,
      authors: [],
      header: "New Course"
    }*/
  }

  handleSubmit() {
    console.log(this.course);
    this.loaderService.show();
    this.store.dispatch(addCourse({ course: this.course }));
    this.loaderService.hide();
    this.router.navigate(["/courses"]);
  }
}
