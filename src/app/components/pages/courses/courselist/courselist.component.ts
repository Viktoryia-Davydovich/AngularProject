import { Component, OnInit } from "@angular/core";

import { Course } from "src/app/models/Course";
import { CourseService } from "src/app/core/services/course.service";
import { Observable, pipe } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { getCourselist } from "../../../../store/actions/courses.actions";
import { selectCourses } from "src/app/store/selectors/app.selector";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  private subscription;
  courses: Course[] = [];
  //filteredCourses: Course[] = [];
  filteredCourses: Observable<Course[]>;
  searchedCourse: string;
  start: number = 0;
  end: number = 3;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.updateCourselist();
  }

  updateCourselist() {
    this.loaderService.show();
    this.store.dispatch(getCourselist({ start: this.start, end: this.end }));
    this.filteredCourses = this.store.pipe(select(selectCourses));
    console.log(this.filteredCourses);
    this.loaderService.hide();
  }

  onSearchCourse(searchText: string) {
    this.loaderService.show();
    this.courseService
      .searchCourses(searchText)
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
    this.loaderService.show();
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation === true) {
      console.log(`You have deleted course number ${deletedCourseId}`);
      this.courseService
        .deleteCourse(deletedCourseId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe();
    }
  };

  loadmore = () => {
    this.end += 3;
    this.updateCourselist();
  };
}
