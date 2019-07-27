import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseComponent } from "./course.component";
import { NO_ERRORS_SCHEMA, DebugElement, Component } from "@angular/core";
import { DurationPipe } from "src/app/shared/pipes/duration.pipe";
import { Course } from "src/app/models/Course";

@Component({
  template: `
    <app-course [course]="course" (deleted)="onDeleted($event)"></app-course>
  `
})
class TestHostComponent {
  course: Course = {
    id: 1,
    title: "TEST TITLE",
    creationDate: new Date(2000, 1, 1),
    duration: 1,
    description: "TEST DESCR"
  };
  deleted: Course;
  onDeleted(course: Course) {
    this.deleted = course;
  }
}

describe("CourseComponent", () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let courseEl: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, TestHostComponent, DurationPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    courseEl = fixture.nativeElement.querySelector(".card");

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(testHost.course).toBeTruthy();
  });
});
