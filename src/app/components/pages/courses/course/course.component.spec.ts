import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseComponent } from "./course.component";
import { NO_ERRORS_SCHEMA, DebugElement, Component } from "@angular/core";
import { DurationPipe } from "src/app/shared/pipes/duration.pipe";
import { Course } from "src/app/models/Course";

describe("CourseComponent", () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let courseEl: any;

  const testCourse: Course = {
    id: 100,
    title: "Title",
    creationDate: new Date(2000, 1, 1),
    duration: 100,
    description: "Description"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, DurationPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = testCourse;

    courseEl = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component.course).toBeTruthy();
  });

  it("should raise selected event when clicked (element.click)", () => {
    let selectedCourse: Course;
    component.deleted.subscribe((course: Course) => (selectedCourse = course));

    courseEl.click();
    expect(selectedCourse).toEqual(testCourse);
  });
});
