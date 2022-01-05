import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassEditAssociateComponent } from './class-edit-associate.component';

describe('ClassEditAssociateComponent', () => {
  let component: ClassEditAssociateComponent;
  let fixture: ComponentFixture<ClassEditAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassEditAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassEditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
