import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent {
  bgColor = `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.4)`;
  @Output() editClick = new EventEmitter();
  @Input() edit!: boolean;

  handleEdit() {
    this.edit = !this.edit;
    this.editClick.emit();
  }

  handleDelete() {}
}
