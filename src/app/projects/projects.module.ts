import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectMainComponent } from './components/project-main/project-main.component';
import { ProjectRoutingModule } from './project-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProjectHttpService } from './services/project-http.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [ProjectCardComponent, ProjectMainComponent],
  imports: [CommonModule, ProjectRoutingModule, HttpClientModule],
  providers: [ProjectHttpService, ProjectService],
})
export class ProjectsModule {}
