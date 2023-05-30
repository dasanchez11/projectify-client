import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ReportResponse } from '../../models/report-response.model';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { ReportHttpService } from '../../services/report-http.service';
import { CreateReport } from '../../models/create-report.model';
import { FormGroup } from '@angular/forms';
import { createEditGroup } from '../../forms/create-edit.form';

@Component({
  selector: 'app-report-specific',
  templateUrl: './report-specific.component.html',
  styleUrls: ['./report-specific.component.scss'],
})
export class ReportSpecificComponent implements OnInit {
  readonly #unsubscribe$ = new Subject<void>();
  @Input() week!: number;
  @Input() year!: number;
  @Input() weekIso!: string;
  reportForm: FormGroup = createEditGroup;
  isNew: boolean = false;
  isEdit: boolean = false;
  title = this.isEdit ? 'Edit' : 'Create';
  reports!: ReportResponse[];
  reportIdToEdit!: string | null;

  constructor(
    private reportService: ReportService,
    private reportHttp: ReportHttpService
  ) {}

  ngOnInit(): void {
    this.reportService.report$
      .pipe(takeUntil(this.#unsubscribe$), distinctUntilChanged())
      .subscribe((allReports) => {
        if (allReports) {
          this.reports = allReports;
        }
      });
  }

  handleEdit(reportId: string) {
    this.resetEditAndNew(false);
    this.reportIdToEdit = reportId;
    const report = this.reports.find((report) => report._id === reportId);
    if (report) {
      const { hours, projectId } = report;
      this.reportForm.setValue({ projectId, hours });
    }
  }

  handleNew() {
    this.resetEditAndNew(true);
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }

  handleFormSubmit({ hours, projectId }: { hours: number; projectId: string }) {
    if (this.isEdit && this.reportIdToEdit) {
      this.reportHttp
        .editReport(this.reportIdToEdit, hours, projectId)
        .subscribe();
    } else if (this.isNew) {
      const newReport: CreateReport = {
        hours: hours,
        projectId: projectId,
        week: this.weekIso,
      };
      this.reportHttp.createReport(newReport).subscribe();
    }
    this.closeForm();
  }

  resetEditAndNew(value: boolean) {
    this.reportForm.reset();
    if (value) {
      this.isEdit = false;
      this.reportIdToEdit = null;
      this.isNew = !this.isNew;
    } else {
      this.isNew = false;
      this.isEdit = !this.isEdit;
    }
  }

  closeForm() {
    this.isEdit = false;
    this.reportIdToEdit = null;
    this.isNew = false;
  }
}
