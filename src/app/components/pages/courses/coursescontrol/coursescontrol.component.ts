import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges
} from "@angular/core";
import { EditableCourse } from "src/app/models/Course";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";
import { CourseService } from "src/app/core/services/course.service";

@Component({
  selector: "app-coursescontrol",
  templateUrl: "./coursescontrol.component.html",
  styleUrls: ["./coursescontrol.component.css"]
})
export class CoursescontrolComponent implements OnInit {
  @ViewChild("searchedCourse", { static: false }) searchedCourse: ElementRef;
  @Output() apiFiltered = new EventEmitter<any>();
  apiResponse: any;
  isSearching: boolean;

  constructor(private router: Router, private courseService: CourseService) {
    this.isSearching = false;
    this.apiResponse = [];
  }

  ngOnInit() {
    fromEvent(this.searchedCourse.nativeElement, "keyup")
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 3),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((searchText: string) => {
        this.isSearching = true;
        console.log("searching for the course...");
        this.courseService.searchCourses(searchText).subscribe(
          res => {
            console.log("res", res);
            this.isSearching = false;
            this.apiResponse = res;
            this.apiFiltered.emit(this.apiResponse);
          },
          err => {
            this.isSearching = false;
            console.log("error", err);
          }
        );
      });
  }

  addCourse() {
    this.router.navigateByUrl("/courses/new");
  }
}
