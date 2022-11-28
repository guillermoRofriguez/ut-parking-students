import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistervehiculoComponent } from './pages/registervehiculo/registervehiculo.component';
import { VeiculosComponent } from './pages/veiculos/veiculos.component';

const routes: Routes = [ 
  {path: '', redirectTo: '/sing-in', pathMatch: 'full'},
  {path: 'sing-in', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'all-user', component: AllUsersComponent, canActivate:[AuthGuard]},
  {path: 'register-vehiculo', component: RegistervehiculoComponent, canActivate:[AuthGuard]},
  {path: 'vehiculos/:uid', component: VeiculosComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
