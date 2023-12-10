import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent() {
      return import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      );
    },
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
