import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { currentUserGuard } from './shared/guards/current-user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'projects',
    canActivate: [currentUserGuard],
    loadChildren: () =>
      import('./projects/projects.module').then(
        (module) => module.ProjectsModule
      ),
  },
  {
    path: 'reports',
    canActivate: [currentUserGuard],
    loadChildren: () =>
      import('./reports/reports.module').then((module) => module.ReportsModule),
  },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [currentUserGuard],
})
export class AppRoutingModule {}
