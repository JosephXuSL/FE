import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditInfoComponent } from './course-edit-info.component';

describe('CourseEditInfoComponent', () => {
  let component: CourseEditInfoComponent;
  let fixture: ComponentFixture<CourseEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
