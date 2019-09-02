import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EditableCourse } from "src/app/models/Course";
import { Router } from "@angular/router";

@Component({
  selector: "app-coursescontrol",
  templateUrl: "./coursescontrol.component.html",
  styleUrls: ["./coursescontrol.component.css"]
})
export class CoursescontrolComponent implements OnInit {
  @Input() searchedCourse: string;
  @Output() searchText = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit() {}

  searchCourse = () => {
    this.searchText.emit(this.searchedCourse);
  };

  addCourse() {
    this.router.navigateByUrl("/courses/new");
  }
}
