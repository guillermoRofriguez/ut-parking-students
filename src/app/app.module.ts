import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';


import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import {MatMenuModule} from '@angular/material/menu';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import {MatTableModule} from '@angular/material/table';
import { RegisterComponent } from './pages/register/register.component';
import {RegistervehiculoComponent} from './pages/registervehiculo/registervehiculo.component'
import { HttpClientModule } from '@angular/common/http';
import { VeiculosComponent } from './pages/veiculos/veiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    AllUsersComponent,
    RegisterComponent,
    RegistervehiculoComponent,
    VeiculosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
