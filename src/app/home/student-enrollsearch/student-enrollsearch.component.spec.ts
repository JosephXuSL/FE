import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollsearchComponent } from './student-enrollsearch.component';

describe('StudentEnrollsearchComponent', () => {
  let component: StudentEnrollsearchComponent;
  let fixture: ComponentFixture<StudentEnrollsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEnrollsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
