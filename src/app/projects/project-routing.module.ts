import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectMainComponent } from './components/project-main/project-main.component';
import { projectGuard } from './guards/project.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [projectGuard],
    children: [
      {
        path: '',
        component: ProjectMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
