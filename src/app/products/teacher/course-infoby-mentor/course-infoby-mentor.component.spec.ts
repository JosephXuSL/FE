import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInfobyMentorComponent } from './course-infoby-mentor.component';

describe('CourseInfobyMentorComponent', () => {
  let component: CourseInfobyMentorComponent;
  let fixture: ComponentFixture<CourseInfobyMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInfobyMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInfobyMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
