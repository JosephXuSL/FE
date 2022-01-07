import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreImportInfoComponent } from './score-import-info.component';

describe('ScoreImportInfoComponent', () => {
  let component: ScoreImportInfoComponent;
  let fixture: ComponentFixture<ScoreImportInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreImportInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreImportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
