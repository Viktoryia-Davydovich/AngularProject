import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablecourseComponent } from './editablecourse.component';

describe('EditablecourseComponent', () => {
  let component: EditablecourseComponent;
  let fixture: ComponentFixture<EditablecourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditablecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
