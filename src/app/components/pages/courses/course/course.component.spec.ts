import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  NO_ERRORS_SCHEMA,
  DebugElement,
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";

import { CourseComponent } from "./course.component";
import { DurationPipe } from "src/app/shared/pipes/duration.pipe";
import { Course } from "src/app/models/course";
import { click } from "src/app/shared/testingHelpers/clickHelper";

/******************** CREATING HOST COMPONENT ********************/

@Component({
  template: `
    <app-course [course]="course" (deleted)="onDeleted($event)"></app-course>
  `
})
class TestHostComponent {
  course: Course = {
    id: 1,
    title: "TEST TITLE",
    date: new Date(2000, 1, 1),
    length: 1,
    topRated: true,
    description: "TEST DESCR"
  };
  deleted: Course;
  onDeleted(course: Course) {
    this.deleted = course;
  }
}
/************************************************************** */

describe("CourseComponent", () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let courseEl: any;
  let courseElDelBtn: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, TestHostComponent, DurationPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    courseEl = fixture.nativeElement.querySelector(".card");
    courseElDelBtn = fixture.nativeElement.querySelector(".card__button--del");

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(testHost.course).toBeTruthy();
  });

  it("should display course title", () => {
    const expectedCourseTitle = testHost.course.title;
    expect(courseEl.textContent).toContain(expectedCourseTitle);
  });

  it("should raise selected event when clicked", () => {
    click(courseElDelBtn);
    expect(console.log);
  });
});
