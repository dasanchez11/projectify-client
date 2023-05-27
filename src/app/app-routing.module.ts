import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then(
        (module) => module.ProjectsModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((module) => module.ReportsModule),
  },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
