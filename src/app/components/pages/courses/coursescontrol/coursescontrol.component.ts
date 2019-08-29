import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EditableCourse } from "src/app/models/Course";
import { DataBindingService } from "src/app/core/services/data-binding.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-coursescontrol",
  templateUrl: "./coursescontrol.component.html",
  styleUrls: ["./coursescontrol.component.css"]
})
export class CoursescontrolComponent implements OnInit {
  @Input() searchedCourse: string;
  @Output() searchText = new EventEmitter<string>();

  constructor(private dataBinder: DataBindingService, private router: Router) {}

  ngOnInit() {}

  searchCourse = () => {
    this.searchText.emit(this.searchedCourse);
  };

  addCourse() {
    const editableCourse = new EditableCourse();
    editableCourse.title = "";
    editableCourse.description = "";
    editableCourse.duration = 0;
    editableCourse.date = null;
    editableCourse.header = "New Course";
    this.dataBinder.sendCourseToEdit(editableCourse);
    this.router.navigateByUrl("/courses/new");
  }
}
