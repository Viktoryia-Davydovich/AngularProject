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
import { CourseService } from "src/app/services/course.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-coursescontrol",
  templateUrl: "./coursescontrol.component.html",
  styleUrls: ["./coursescontrol.component.css"]
})
export class CoursescontrolComponent implements OnInit {
  @Output() searchText = new EventEmitter<string>();
  keyUp = new Subject<KeyboardEvent>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.keyUp
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 3 || res.length === 0),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((searchedCourse: string) => {
        this.searchText.emit(searchedCourse);
      });
  }

  addCourse() {
    this.router.navigateByUrl("/courses/new");
  }
}
