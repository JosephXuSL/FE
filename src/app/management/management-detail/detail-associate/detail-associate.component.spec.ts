import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAssociateComponent } from './detail-associate.component';

describe('DetailAssociateComponent', () => {
  let component: DetailAssociateComponent;
  let fixture: ComponentFixture<DetailAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
