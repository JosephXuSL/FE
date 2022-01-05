import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditAssociateComponent } from './teacher-edit-associate.component';

describe('TeacherEditAssociateComponent', () => {
  let component: TeacherEditAssociateComponent;
  let fixture: ComponentFixture<TeacherEditAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEditAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
