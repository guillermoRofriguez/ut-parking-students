import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [ 
  {path: '', redirectTo: '/sing-in', pathMatch: 'full'},
  {path: 'sing-in', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'all-user', component: AllUsersComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
