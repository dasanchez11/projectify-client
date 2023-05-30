import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  bgColor = `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.4)`;
  @Input() title!: string;
  @Input() description!: string;
}
