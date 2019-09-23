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
import { fromEvent, Subject } from "rxjs";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  finalize
} from "rxjs/operators";
import { CourseService } from "src/app/core/services/course.service";
import { LoaderService } from "src/app/core/services/loader.service";

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
  keyUp = new Subject<KeyboardEvent>();

  constructor(
    private router: Router,
    private courseService: CourseService,
    private loaderService: LoaderService
  ) {
    this.isSearching = false;
  }

  ngOnInit() {
    this.keyUp
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 3),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((searchText: string) => {
        console.log("searching for the course...");
        this.courseService.searchCourses(searchText).subscribe(
          res => {
            console.log("res", res);
            this.isSearching = false;
            this.apiFiltered.emit(res);
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
