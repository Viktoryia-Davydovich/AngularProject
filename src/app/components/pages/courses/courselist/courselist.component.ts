import { Component, OnInit, ViewChild } from "@angular/core";

import { Course } from "src/app/models/Course";
import { FilterPipe } from "src/app/shared/pipes/filter.pipe";
import { OrderByDatePipe } from "src/app/shared/pipes/order-by-date.pipe";
import { CourseService } from "src/app/core/services/course.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  courses: Course[];
  filteredCourses: Course[];
  searchedCourse: string;
  showCoursesStart: number = 0;
  showCoursesFinish: number = 3;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourseList().subscribe((data: Course[]) => {
      this.courses = data;
      this.filterByDate();
      this.filteredCourses = [...this.courses];
    });
  }

  filterByDate() {
    const orderByPipe = new OrderByDatePipe();
    this.courses = orderByPipe.transform(this.courses);
  }

  onSearchCourse(text: string) {
    const filterPipe = new FilterPipe();
    this.searchedCourse = text;
    this.filteredCourses = filterPipe.transform(
      this.courses,
      this.searchedCourse
    );
  }
  onDeleted = (deletedCourseId: number) => {
    console.log(`You have deleted course number ${deletedCourseId}`);
    let c = confirm("Are you sure you want to delete this item?");
    if (c === true) {
      this.courseService.deleteCourse(deletedCourseId);
    }
  };

  loadmore = () => {
    this.showCoursesFinish += 3;
  };
}
