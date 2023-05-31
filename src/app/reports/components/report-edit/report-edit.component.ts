import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportResponse } from '../../models/report-response.model';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { Project } from '../../../projects/models/project.model';
import { ReportHttpService } from '../../services/report-http.service';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss'],
})
export class ReportEditComponent implements OnInit {
  readonly #unsubscribe$ = new Subject<void>();
  @Input() title!: string;
  @Input() createEditForm!: FormGroup;
  @Output() formValue = new EventEmitter();
  @Input() toEditId!: string | null;
  currentReports!: ReportResponse[];
  projects!: Project[];

  constructor(
    private reportService: ReportService,
    private reportHttp: ReportHttpService
  ) {}

  ngOnInit(): void {
    this.reportService.report$
      .pipe(takeUntil(this.#unsubscribe$), distinctUntilChanged())
      .subscribe((rep) => {
        if (rep) {
          this.currentReports = rep;
        }
      });

    this.reportHttp.getProjects().subscribe((projects) => {
      if (projects) {
        this.projects = projects;
      }
    });
  }

  onSubmit() {
    const formValid = this.createEditForm.valid;
    if (!formValid) {
      return;
    }
    const validHours = this.validateHours(+this.createEditForm.value.hours);
    if (!validHours) {
      return window.alert('User can only work maximum 45 hours per week');
    }

    this.formValue.emit(this.createEditForm.value);
  }

  validateHours(newHours: number) {
    let reports = this.currentReports;
    if (this.toEditId) {
      reports = reports.filter((report) => report._id !== this.toEditId);
    }
    const currentHours = reports.reduce(
      (total, report) => (total += report.hours),
      0
    );
    return currentHours + newHours <= 45;
  }

  getControl(name: string) {
    return <FormControl>this.createEditForm.get(name);
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
