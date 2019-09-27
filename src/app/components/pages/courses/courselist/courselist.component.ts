import { Component, OnInit, ViewChild } from "@angular/core";

import { Course } from "src/app/models/Course";
import { FilterPipe } from "src/app/shared/pipes/filter.pipe";
import { OrderByDatePipe } from "src/app/shared/pipes/order-by-date.pipe";
import { CourseService } from "src/app/core/services/course.service";
import { Observable, pipe } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../store/reducers/app.reducer'
import * as coursesActions from "../../../../store/actions/courses.actions"

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  //courses: Course[] = [];
  //filteredCourses: Course[] = [];
  filteredCourses: Observable<Course[]> 
  searchedCourse: string;
  start: number = 0;
  end: number = 3;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private store: Store<{appState}>
  ) {
    this.filteredCourses = store.select(state => state.appState.courses)
  }

  ngOnInit() {
    this.updateCourselist();
  }

  updateCourselist() {
    this.loaderService.show()
    this.courseService
      .getCourseList(this.start, this.end)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe((data: Course[]) => {
        data = data.map(course => {
          course.date = new Date(course.date);
          return course;
        });
        console.log(data)
        this.store.dispatch(coursesActions.listCourses({courses: data}))
      });


;

  }
/*
  filterByDate() {
    const orderByPipe = new OrderByDatePipe();
    this.courses = orderByPipe.transform(this.courses);
  }
*/
  onSearchCourse(searchText: string) {
    this.loaderService.show()
    this.courseService.searchCourses(searchText)
    .pipe(finalize(() => this.loaderService.hide()))
    .subscribe(
      res => {
        console.log("res", res);
        if (res.length === 0) {
          this.updateCourselist();
        } else {
          this.filteredCourses = res;
        }
      },
      err => {
        console.log("error", err);
      }
    );
  }

  onApiSearchResponse(apiResp: any) {
    this.filteredCourses = apiResp;
  }

  onDeleted = (deletedCourseId: number) => {
    this.loaderService.show()
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation === true) {
      console.log(`You have deleted course number ${deletedCourseId}`);
      this.courseService.deleteCourse(deletedCourseId)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe();
    }
  };

  loadmore = () => {
    this.end += 3;
    this.updateCourselist();
  };
}
