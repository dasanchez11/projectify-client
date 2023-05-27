import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-specific',
  templateUrl: './report-specific.component.html',
  styleUrls: ['./report-specific.component.scss'],
})
export class ReportSpecificComponent {
  @Input() week!: number;
  @Input() year!: number;
  isNew: boolean = false;
  isEdit: boolean = false;
  title = this.isEdit ? 'Edit' : 'Create';

  handleEdit() {
    this.isNew = false;
    this.isEdit = !this.isEdit;
  }

  handleNew() {
    this.isNew = !this.isNew;
    this.isEdit = false;
  }
}
