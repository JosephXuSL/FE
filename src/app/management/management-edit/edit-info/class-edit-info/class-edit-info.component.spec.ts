import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassEditInfoComponent } from './class-edit-info.component';

describe('ClassEditInfoComponent', () => {
  let component: ClassEditInfoComponent;
  let fixture: ComponentFixture<ClassEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
