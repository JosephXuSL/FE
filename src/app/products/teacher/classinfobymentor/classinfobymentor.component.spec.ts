import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassinfobymentorComponent } from './classinfobymentor.component';

describe('ClassinfobymentorComponent', () => {
  let component: ClassinfobymentorComponent;
  let fixture: ComponentFixture<ClassinfobymentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassinfobymentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassinfobymentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
