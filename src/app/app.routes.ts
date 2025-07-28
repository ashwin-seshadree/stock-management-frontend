import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { ForgotPassword } from './components/auth/forgot-password/forgot-password';
import { authGuard } from './configs/auth.gaurd';
import { Layout } from './layout/layout/layout';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Login' },
  { path: 'forgot-password', component: ForgotPassword, title: 'Forgot Password' },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./components/pages/dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard' },
      { path: 'products', loadComponent: () => import('./components/pages/products/products').then(m => m.Products), title: 'Products' },
      { path: 'orders', loadComponent: () => import('./components/pages/orders/orders').then(m => m.Orders), title: 'Orders' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
