import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CourselistComponent } from "./courselist.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("CourselistComponent", () => {
  let component: CourselistComponent;
  let fixture: ComponentFixture<CourselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourselistComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
