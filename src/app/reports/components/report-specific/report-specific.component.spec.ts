import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpecificComponent } from './report-specific.component';
import { ReportService } from '../../services/report.service';
import { ReportHttpService } from '../../services/report-http.service';
import { of } from 'rxjs';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';
import { ReportsModule } from '../../reports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockReport } from '../../test-utils/mock-reports';

describe('ReportSpecificComponent', () => {
  let component: ReportSpecificComponent;
  let fixture: ComponentFixture<ReportSpecificComponent>;
  let mockReportService: ReportService;
  let mockReportHttp: ReportHttpService;

  beforeEach(() => {
    mockReportService = {
      report$: of([]),
    } as unknown as ReportService;

    mockReportHttp = jasmine.createSpyObj('reportHttp', [
      'editReport',
      'createReport',
    ]);

    TestBed.configureTestingModule({
      declarations: [ReportSpecificComponent],
      imports: [ReportsModule, BrowserAnimationsModule],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: ReportHttpService, useValue: mockReportHttp },
      ],
    });
    fixture = TestBed.createComponent(ReportSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should closeForm', () => {
    component.isEdit = true;
    component.reportIdToEdit = 'id';
    component.isNew = true;
    component.closeForm();
    expect(component.isEdit).toBeFalse();
    expect(component.reportIdToEdit).toBeNull();
    expect(component.isNew).toBeFalse();
  });

  it('should resetEditAndNew when input=true', () => {
    spyOn(component.reportForm, 'reset');
    component.isEdit = true;
    component.reportIdToEdit = 'id';
    component.isNew = true;
    component.resetEditAndNew(true);
    expect(component.isEdit).toBeFalse();
    expect(component.reportIdToEdit).toBeNull();
    expect(component.isNew).toBeFalse();
  });

  it('should resetEditAndNew when input=false', () => {
    spyOn(component.reportForm, 'reset');
    component.isEdit = true;
    component.isNew = true;
    component.resetEditAndNew(false);
    expect(component.isEdit).toBeFalse();
    expect(component.isNew).toBeFalse();
  });

  describe('should handleFormSubmit', () => {
    it('should handle form submit when edit', () => {
      mockReportHttp.editReport = jasmine.createSpy().and.returnValue(of(true));
      component.isEdit = true;
      component.reportIdToEdit = 'id';
      component.handleFormSubmit({ hours: 3, projectId: 'pid' });
      expect(mockReportHttp.editReport).toHaveBeenCalledTimes(1);
      expect(mockReportHttp.editReport).toHaveBeenCalledOnceWith(
        'id',
        3,
        'pid'
      );
    });

    it('should handle form submit when new', () => {
      mockReportHttp.createReport = jasmine
        .createSpy()
        .and.returnValue(of(true));
      component.isEdit = false;
      component.isNew = true;
      component.weekIso = 'week';
      const newReport = {
        hours: 3,
        projectId: 'pid',
        week: 'week',
      };
      component.handleFormSubmit({ hours: 3, projectId: 'pid' });
      expect(mockReportHttp.createReport).toHaveBeenCalledTimes(1);
      expect(mockReportHttp.createReport).toHaveBeenCalledOnceWith(newReport);
    });
  });

  it('should handleNew', () => {
    spyOn(component, 'resetEditAndNew');
    component.handleNew();
    expect(component.resetEditAndNew).toHaveBeenCalledTimes(1);
  });

  it('should handleEdit', () => {
    spyOn(component, 'resetEditAndNew');
    component.reports = [mockReport];
    spyOn(component.reportForm, 'setValue');
    component.handleEdit('id');
    expect(component.resetEditAndNew).toHaveBeenCalledTimes(1);
    expect(component.reportIdToEdit).toEqual('id');
  });
});
