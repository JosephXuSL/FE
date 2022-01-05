import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEidtInfoComponent } from './teacher-eidt-info.component';

describe('TeacherEidtInfoComponent', () => {
  let component: TeacherEidtInfoComponent;
  let fixture: ComponentFixture<TeacherEidtInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEidtInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEidtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
