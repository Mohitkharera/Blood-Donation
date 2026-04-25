import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/get-started',
    pathMatch: 'full'
  },
  {
    path: 'get-started',
    loadComponent: () => import('./pages/get-started/get-started.page').then(m => m.GetStartedPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'smart-donor-match',
    loadComponent: () => import('./pages/smart-donor-match/smart-donor-match.page').then(m => m.SmartDonorMatchPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'donor-rewards',
    loadComponent: () => import('./pages/donor-rewards/donor-rewards.page').then(m => m.DonorRewardsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'donors',
    loadComponent: () => import('./pages/donors/donors.page').then(m => m.DonorsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'plasma-home',
    loadComponent: () => import('./pages/plasma-home/plasma-home.page').then(m => m.PlasmaHomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'hospital-list',
    loadComponent: () => import('./pages/hospital-list/hospital-list.page').then(m => m.HospitalListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'donor-registration',
    loadComponent: () => import('./pages/donor-registration/donor-registration.page').then(m => m.DonorRegistrationPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'plasma-register',
    loadComponent: () => import('./pages/plasma-donor-registration/plasma-donor-registration.page').then( m => m.PlasmaDonorRegistrationPage),
    canActivate: [AuthGuard]
  }
];
