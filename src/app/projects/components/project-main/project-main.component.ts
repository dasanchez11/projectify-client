import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectHttpService } from '../../services/project-http.service';

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss'],
})
export class ProjectMainComponent implements OnInit {
  projects!: Project[];
  hasProjects!: boolean;

  constructor(private projectsHttp: ProjectHttpService) {}

  ngOnInit(): void {
    this.projectsHttp.getAllProjects().subscribe((value) => {
      if (value) {
        this.hasProjects = value.length !== 0;
        this.projects = value;
      }
    });
  }
}
