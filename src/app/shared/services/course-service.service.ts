import { Injectable } from "@angular/core";
import { Course } from "src/app/models/Course";

@Injectable({
  providedIn: "root"
})
export class CourseServiceService {
  constructor() {}

  getCourseList() {
    let courses = [
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

    return courses;
  }

  getCourseById(courseId: number) {
    const courses = this.getCourseList();
    for (var i = 0; i < courses.length; i++) {
      if (courses[i].id === courseId) {
        return courses[i];
      }
    }
  }

  getId(courses: Course[]) {
    let ids: number[];
    for (var i = 0; i < courses.length; i++) {
      ids.push(courses[i].id);
    }
    return Math.max.apply(Math, ids);
  }

  createCourse(
    title: string,
    duration: number,
    topRated: boolean,
    description: string
  ) {
    let courses = this.getCourseList();
    let id = this.getId(courses);

    const newCourse = {
      id: id + 1,
      title: title,
      duration: duration,
      topRated: topRated,
      creationDate: new Date(),
      description: description
    };

    courses.push(newCourse);
  }
}
