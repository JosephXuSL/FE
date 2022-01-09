import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScheduleEditInfoComponent } from './course-schedule-edit-info.component';

describe('CourseScheduleEditInfoComponent', () => {
  let component: CourseScheduleEditInfoComponent;
  let fixture: ComponentFixture<CourseScheduleEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseScheduleEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseScheduleEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
