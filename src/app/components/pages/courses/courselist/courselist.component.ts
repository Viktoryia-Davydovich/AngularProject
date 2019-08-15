import { Component, OnInit, ViewChild } from "@angular/core";

import { Course } from "src/app/models/Course";
import { FilterPipe } from "src/app/shared/pipes/filter.pipe";
import { OrderByDatePipe } from "src/app/shared/pipes/order-by-date.pipe";
import { CourseServiceService } from "src/app/core/services/course.service";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  courses: Course[];
  filteredCourses: Course[];
  searchedCourse: string;

  constructor(private courseService: CourseServiceService) {
    console.log("that's constructor");
  }

  // 1st
  ngOnChanges() {
    console.log("1 - OnChanges hook FROM LIST");
  }

  //2nd
  ngOnInit() {
    console.log("2 - OnInit hook");
    this.courses = this.courseService.getCourseList();
    this.filterByDate();
    console.log(this.courses);
  }

  filterByDate() {
    const orderByPipe = new OrderByDatePipe();
    this.courses = orderByPipe.transform(this.courses);
    console.log("ORDERED");
  }

  onSearchCourse(text: string) {
    const filterPipe = new FilterPipe();
    this.searchedCourse = text;
    this.filteredCourses = filterPipe.transform(
      this.courses,
      this.searchedCourse
    );
  }

  //3d
  ngDoCheck() {
    console.log("3 - DoCheck hook");
  }

  //4th
  ngAfterContentInit() {
    console.log("4 - AfterContentInit hook");
  }

  //5th
  ngAfterContentChecked() {
    console.log("5 - AfterContentChecked hook");
  }

  //6th
  ngAfterViewInit() {
    console.log("6 - AfterViewInit hook");
  }

  //7th
  ngAfterViewChecked() {
    console.log("7 - AfterViewChecked hook");
  }

  //8th
  ngOnDestroy() {
    console.log("8 - OnDestroy hook");
  }

  onDeleted = (deletedCourseId: number) => {
    console.log(`You have deleted course number ${deletedCourseId}`);
    let c = confirm("Are you sure you want to delete this item?");
    if (c === true) {
      this.courseService.deleteCourse(deletedCourseId);
    }
  };

  loadmore = () => console.log("Loading more...");
}
