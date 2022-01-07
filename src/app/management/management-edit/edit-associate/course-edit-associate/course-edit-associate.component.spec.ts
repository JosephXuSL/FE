import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditAssociateComponent } from './course-edit-associate.component';

describe('CourseEditAssociateComponent', () => {
  let component: CourseEditAssociateComponent;
  let fixture: ComponentFixture<CourseEditAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
