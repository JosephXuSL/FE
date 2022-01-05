import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorEditAssociateComponent } from './major-edit-associate.component';

describe('MajorEditAssociateComponent', () => {
  let component: MajorEditAssociateComponent;
  let fixture: ComponentFixture<MajorEditAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorEditAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorEditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
