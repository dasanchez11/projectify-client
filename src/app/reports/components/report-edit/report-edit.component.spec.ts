import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEditComponent } from './report-edit.component';
import { ReportService } from '../../services/report.service';
import { ReportHttpService } from '../../services/report-http.service';
import { of } from 'rxjs';
import { ReportsModule } from '../../reports.module';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';
import { AbstractControl } from '@angular/forms';
import { createEditGroup } from '../../forms/create-edit.form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockReport } from '../../test-utils/mock-reports';
import { ReportResponse } from '../../models/report-response.model';

describe('ReportEditComponent', () => {
  let component: ReportEditComponent;
  let fixture: ComponentFixture<ReportEditComponent>;
  let mockReportService: ReportService;
  let mockReportHttp: ReportHttpService;

  beforeEach(() => {
    mockReportService = {
      report$: of(true),
    } as unknown as ReportService;

    mockReportHttp = {
      getProjects: jasmine.createSpy('').and.returnValue(of([])),
    } as unknown as ReportHttpService;

    TestBed.configureTestingModule({
      declarations: [ReportEditComponent],
      imports: [ReportsModule, BrowserAnimationsModule],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: ReportHttpService, useValue: mockReportHttp },
      ],
    });
    const mockForm = createEditGroup;
    fixture = TestBed.createComponent(ReportEditComponent);
    component = fixture.componentInstance;
    component.createEditForm = mockForm;
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getControl ', () => {
    const control = component.getControl('hours');
    const instance = control instanceof AbstractControl;
    expect(instance).toBe(true);
  });

  describe('should validate hours', () => {
    it('validate hours if doesnt has hours', () => {
      const reports: ReportResponse[] = [];
      component.currentReports = reports;
      const result = component.validateHours(20);
      expect(result).toEqual(true);
    });

    it('validate hours if report to edit', () => {
      const reports: ReportResponse[] = [mockReport];
      component.currentReports = reports;
      component.toEditId = 'id';
      const result = component.validateHours(45);
      expect(result).toEqual(true);
    });
  });

  describe('should submit', () => {
    it('should submit if form valid and valid hours ', () => {
      spyOnProperty(component.createEditForm, 'valid').and.returnValue(true);
      spyOn(component, 'validateHours').and.returnValue(true);
      spyOn(component.formValue, 'emit');
      component.onSubmit();
      expect(component.formValue.emit).toHaveBeenCalledTimes(1);
    });

    it('should submit if form valid and not valid hours ', () => {
      spyOnProperty(component.createEditForm, 'valid').and.returnValue(true);
      spyOn(component, 'validateHours').and.returnValue(false);
      spyOn(window, 'alert');
      component.onSubmit();
      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('should submit if form invalid ', () => {
      spyOnProperty(component.createEditForm, 'valid').and.returnValue(false);
      const result = component.onSubmit();
      expect(result).toBeUndefined();
    });
  });
});
