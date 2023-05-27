import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpecificComponent } from './report-specific.component';

describe('ReportSpecificComponent', () => {
  let component: ReportSpecificComponent;
  let fixture: ComponentFixture<ReportSpecificComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportSpecificComponent]
    });
    fixture = TestBed.createComponent(ReportSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
