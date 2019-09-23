import { Component, OnInit, ViewChild } from "@angular/core";

import { Course } from "src/app/models/Course";
import { FilterPipe } from "src/app/shared/pipes/filter.pipe";
import { OrderByDatePipe } from "src/app/shared/pipes/order-by-date.pipe";
import { CourseService } from "src/app/core/services/course.service";
import { Observable, pipe } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "src/app/core/services/loader.service";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchedCourse: string;
  start: number = 0;
  end: number = 3;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.updateCourselist();
  }

  updateCourselist() {
    this.courseService
      .getCourseList(this.start, this.end)
      .subscribe((data: Course[]) => {
        data = data.map(course => {
          course.date = new Date(course.date);
          return course;
        });
        this.courses = data;
        this.filterByDate();
        this.filteredCourses = [...this.courses];
      });
  }

  filterByDate() {
    const orderByPipe = new OrderByDatePipe();
    this.courses = orderByPipe.transform(this.courses);
  }

  onApiSearchResponse(apiResp: any) {
    this.filteredCourses = apiResp;
  }

  onDeleted = (deletedCourseId: number) => {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation === true) {
      console.log(`You have deleted course number ${deletedCourseId}`);
      this.courseService.deleteCourse(deletedCourseId).subscribe();
    }
  };

  loadmore = () => {
    this.end += 3;
    this.updateCourselist();
  };
}
