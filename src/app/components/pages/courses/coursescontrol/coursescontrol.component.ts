import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-coursescontrol",
  templateUrl: "./coursescontrol.component.html",
  styleUrls: ["./coursescontrol.component.css"]
})
export class CoursescontrolComponent implements OnInit {
  @Input() searchedCourse: string;
  @Output() searchText = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  searchCourse = () => {
    console.log(this.searchedCourse);
    this.searchText.emit(this.searchedCourse);
  };
}
