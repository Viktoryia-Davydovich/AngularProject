import { Injectable } from "@angular/core";
import {
  Course,
  NewCourse,
  UpdatedCourse,
  EditableCourse
} from "src/app/models/course";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courses: Course[] = [
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
    },
    {
      id: 4,
      title: "Video Course 4. Name tag",
      creationDate: new Date(2018, 10, 9),
      duration: 88,
      topRated: false,
      description:
        "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester."
    }
  ];

  constructor() {}

  getCourseList(): Course[] {
    return this.courses;
  }

  getCourseById(courseId: number): Course {
    return this.courses.find(c => c.id === courseId);
  }

  createCourse(addedCourse: NewCourse) {
    const newCourse = {
      id: this.courses.length,
      title: addedCourse.title,
      duration: addedCourse.duration,
      authors: addedCourse.authors,
      creationDate: new Date(),
      description: addedCourse.description
    };
    this.courses.push(newCourse);
  }

  deleteCourse(courseId: number): void {
    this.courses.splice(
      this.courses.indexOf(this.courses.find(c => c.id === courseId)),
      1
    );
  }

  updateCourse(updatedCourse: UpdatedCourse) {
    let updCourse = this.courses.find(c => c.id === updatedCourse.id);
    updCourse.title = updatedCourse.title;
    updCourse.description = updatedCourse.description;
    updCourse.duration = updatedCourse.duration;
    updCourse.authors = updatedCourse.authors;
  }
}
