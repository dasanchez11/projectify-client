import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportHttpService } from '../../services/report-http.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent {
  bgColor = `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.4)`;
  @Output() editClick = new EventEmitter();
  @Input() edit!: boolean;
  @Input() title!: string;
  @Input() description!: string;
  @Input() reportId!: string;
  @Input() hours!: number;

  constructor(private reportHttp: ReportHttpService) {}

  handleEdit() {
    this.edit = !this.edit;
    this.editClick.emit(this.reportId);
  }

  handleDelete() {
    const result = confirm('Are you sure you want to delete this report');
    if (result) {
      this.reportHttp.deleteReport(this.reportId).subscribe();
    }
  }
}
