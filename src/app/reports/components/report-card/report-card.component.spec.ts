import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCardComponent } from './report-card.component';
import { ReportHttpService } from '../../services/report-http.service';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';
import { ReportsModule } from '../../reports.module';
import { of } from 'rxjs';

describe('ReportCardComponent', () => {
  let component: ReportCardComponent;
  let fixture: ComponentFixture<ReportCardComponent>;
  let mockReportHttp: ReportHttpService;

  beforeEach(() => {
    mockReportHttp = jasmine.createSpyObj('reportHttp', ['deleteReport']);

    TestBed.configureTestingModule({
      imports: [ReportsModule],
      declarations: [ReportCardComponent],
      providers: [{ provide: ReportHttpService, useValue: mockReportHttp }],
    });
    fixture = TestBed.createComponent(ReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle delete', () => {
    const reportId = 'myId';
    component.reportId = reportId;
    spyOn(window, 'confirm').and.returnValue(true);
    mockReportHttp.deleteReport = jasmine
      .createSpy('')
      .and.returnValue(of(true));
    component.handleDelete();
    expect(mockReportHttp.deleteReport).toHaveBeenCalledTimes(1);
    expect(mockReportHttp.deleteReport).toHaveBeenCalledWith(reportId);
  });

  it('should handleEdit', () => {
    component.reportId = 'id';
    component.edit = false;
    spyOn(component.editClick, 'emit');
    component.handleEdit();
    expect(component.edit).toBe(true);
    expect(component.editClick.emit).toHaveBeenCalledTimes(1);
    expect(component.editClick.emit).toHaveBeenCalledWith('id');
  });
});
