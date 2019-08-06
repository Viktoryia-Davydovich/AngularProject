import { Component, OnInit, ViewChild } from "@angular/core";

import { Course } from "../../../../models/Course";
import { FilterPipe } from "src/app/shared/pipes/filter.pipe";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  courses: Course[];
  searchedCourse: string;

  constructor() {
    console.log("that's constructor");
  }

  // 1st
  ngOnChanges() {
    console.log("1 - OnChanges hook FROM LIST");
  }

  //2nd
  ngOnInit() {
    console.log("2 - OnInit hook");

    /* COMMENT ASSIGMENT OUT TO SEE NG IF WORKING */

    this.courses = [
      {
        id: 1,
        title: "Video Course 1. Name tag",
        creationDate: new Date(2019, 7, 1),
        duration: 88,
        topRated: true,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester."
      },
      {
        id: 2,
        title: "Video Course 2. Name tag",
        creationDate: new Date(2019, 8, 31),
        duration: 88,
        topRated: true,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester."
      },
      {
        id: 3,
        title: "Video Course 3. Name tag",
        creationDate: new Date(2018, 10, 9),
        duration: 88,
        topRated: false,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester."
      }
    ];
  }

  onSearchCourse(text: string) {
    const filterPipe = new FilterPipe();
    this.searchedCourse = text;
    this.courses = filterPipe.transform(this.courses, this.searchedCourse);
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
  };

  loadmore = () => console.log("Loading more...");
}
