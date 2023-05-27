import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-specific',
  templateUrl: './report-specific.component.html',
  styleUrls: ['./report-specific.component.scss'],
})
export class ReportSpecificComponent {
  @Input() week!: number;
  @Input() year!: number;
}
