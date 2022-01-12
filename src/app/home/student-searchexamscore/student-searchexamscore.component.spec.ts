import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearchexamscoreComponent } from './student-searchexamscore.component';

describe('StudentSearchexamscoreComponent', () => {
  let component: StudentSearchexamscoreComponent;
  let fixture: ComponentFixture<StudentSearchexamscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSearchexamscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSearchexamscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
