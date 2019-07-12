import { Component, OnInit } from "@angular/core";

import { Course } from "../../../../models/Course";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  courses: Course[];

  constructor() {}

  ngOnInit() {
    // hardcoding data
    this.courses = [
      {
        id: 1,
        title: "Video Course 1. Name tag",
        creationDate: new Date(),
        duration: 88,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and detail about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during"
      },
      {
        id: 2,
        title: "Video Course 1. Name tag",
        creationDate: new Date(),
        duration: 88,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and detail about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during"
      },
      {
        id: 3,
        title: "Video Course 1. Name tag",
        creationDate: new Date(),
        duration: 88,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and detail about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during"
      }
    ];
  }
}
