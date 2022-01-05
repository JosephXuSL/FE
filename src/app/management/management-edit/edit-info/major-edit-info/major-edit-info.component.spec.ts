import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorEditInfoComponent } from './major-edit-info.component';

describe('MajorEditInfoComponent', () => {
  let component: MajorEditInfoComponent;
  let fixture: ComponentFixture<MajorEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
