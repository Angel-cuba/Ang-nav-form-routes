import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent() {
      return import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      );
    },
    children: [
      {
        path: 'users',
        loadComponent() {
          return import('./components/users/users/users.component').then(
            (m) => m.UsersComponent
          );
        },
      },
            {
        path: 'user',
        loadComponent() {
          return import('./components/users/user/user.component').then(
            (m) => m.UserComponent
          );
        },
      },
      {
        path: 'about',
        loadComponent() {
          return import('./components/about/about.component').then(
            (m) => m.AboutComponent
          );
        },
      },
      {
        path: 'contact',
        loadComponent() {
          return import('./components/contact/contact.component').then(
            (m) => m.ContactComponent
          );
        },
      },

      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
