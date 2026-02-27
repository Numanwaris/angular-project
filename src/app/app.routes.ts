import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomePage } from './home/home';
import { Signup } from './signup/signup';
import { Search } from './search/search';
import { Admin } from './admin/admin';
import { DashboardComponent } from './dashboard/dashboard';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: Signup },
   { path: 'search', component: Search },
   { path: 'admin', component: Admin },
  { path: 'dashboard', component: DashboardComponent }
];
