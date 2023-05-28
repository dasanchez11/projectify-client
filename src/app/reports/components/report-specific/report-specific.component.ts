import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ReportResponse } from '../../models/report-response.model';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-report-specific',
  templateUrl: './report-specific.component.html',
  styleUrls: ['./report-specific.component.scss'],
})
export class ReportSpecificComponent implements OnInit {
  readonly #unsubscribe$ = new Subject<void>();
  @Input() week!: number;
  @Input() year!: number;
  isNew: boolean = false;
  isEdit: boolean = false;
  title = this.isEdit ? 'Edit' : 'Create';
  reports!: ReportResponse[];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.report$
      .pipe(takeUntil(this.#unsubscribe$), distinctUntilChanged())
      .subscribe((allReports) => {
        if (allReports) {
          this.reports = allReports;
        }
      });
  }

  handleEdit() {
    this.isNew = false;
    this.isEdit = !this.isEdit;
  }

  handleNew() {
    this.isNew = !this.isNew;
    this.isEdit = false;
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
