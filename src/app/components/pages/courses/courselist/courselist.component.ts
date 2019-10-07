import { Component, OnInit } from "@angular/core";

import { Course } from "src/app/models/Course";
import { CourseService } from "src/app/core/services/course.service";
import { Observable } from "rxjs";
import { LoaderService } from "src/app/core/services/loader.service";
import { Store, select } from "@ngrx/store";
import {
  getCourselist,
  findCourses,
  deleteCourse
} from "../../../../store/actions/courses.actions";
import { selectCourses, AppState } from "src/app/store/selectors/app.selector";

@Component({
  selector: "app-courselist",
  templateUrl: "./courselist.component.html",
  styleUrls: ["./courselist.component.css"]
})
export class CourselistComponent implements OnInit {
  filteredCourses: Course[];
  filteredCourses$: Observable<Course[]>;
  searchedCourse: string = "";
  start: number = 0;
  end: number = 3;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.updateCourselist();
  }

  updateCourselist() {
    this.loaderService.show();
    if (this.searchedCourse === "") {
      this.store.dispatch(getCourselist({ start: this.start, end: this.end }));
    } else {
      this.store.dispatch(
        findCourses({
          start: this.start,
          end: this.end,
          searchString: this.searchedCourse
        })
      );
    }
    this.filteredCourses$ = this.store.pipe(select(selectCourses));
    this.filteredCourses$.subscribe(data => (this.filteredCourses = data));
    this.loaderService.hide();
  }

  onSearchCourse(searchText: string) {
    this.loaderService.show();
    this.searchedCourse = searchText;
    this.end = 3;
    this.store.dispatch(
      findCourses({
        start: this.start,
        end: this.end,
        searchString: searchText
      })
    );
    this.filteredCourses$ = this.store.pipe(select(selectCourses));
    this.filteredCourses$.subscribe(data => (this.filteredCourses = data));
    this.loaderService.hide();
  }

  onDeleted = (deletedCourseId: number) => {
    this.loaderService.show();
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation === true) {
      console.log(`You have deleted course number ${deletedCourseId}`);
      this.loaderService.show();
      this.store.dispatch(deleteCourse({ id: deletedCourseId }));
      this.filteredCourses$ = this.store.pipe(select(selectCourses));
      this.filteredCourses$.subscribe(data => (this.filteredCourses = data));
      this.loaderService.hide();
    }
  };

  loadmore = () => {
    this.end += 3;
    this.updateCourselist();
  };
}
