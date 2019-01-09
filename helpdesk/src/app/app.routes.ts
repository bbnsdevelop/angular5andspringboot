import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './security/auth.guard'

export const ROUTES: Routes =[
  {path : '', component : HomeComponent, canActivate: [AuthGuard] },
  {path : 'login', component : LoginComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
