import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeacherAccountComponent } from './create-teacher-account.component';

describe('CreateTeacherAccountComponent', () => {
  let component: CreateTeacherAccountComponent;
  let fixture: ComponentFixture<CreateTeacherAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeacherAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeacherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
