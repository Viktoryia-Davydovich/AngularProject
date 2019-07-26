import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoursescontrolComponent } from "./coursescontrol.component";
import { FormsModule } from "@angular/forms";

describe("CoursescontrolComponent", () => {
  let component: CoursescontrolComponent;
  let fixture: ComponentFixture<CoursescontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursescontrolComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursescontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
