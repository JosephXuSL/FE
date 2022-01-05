import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditInfoComponent } from './student-edit-info.component';

describe('StudentEditInfoComponent', () => {
  let component: StudentEditInfoComponent;
  let fixture: ComponentFixture<StudentEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
