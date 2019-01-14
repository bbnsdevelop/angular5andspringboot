import { AuthGuard } from "./security/guards/auth.guard";
import { UserGuard } from "./security/guards/user.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { TicketGuard } from './security/guards/ticket.guard';

const APP_ROUTES: Routes = [
  { path: 'user', loadChildren: './../app/users/users.module#UsersModule',
                      canActivate: [AuthGuard],
                      canActivateChild:[UserGuard],
                      canLoad: [AuthGuard]
    },
    { path: 'ticket', loadChildren: './../app/ticket/ticket.module#TicketModule',
                      canActivate: [AuthGuard],
                      canActivateChild:[TicketGuard],
                      canLoad: [AuthGuard]
    },
    {
      path : '', component : HomeComponent, canActivate: [AuthGuard]
    },
    {
      path : 'login', component : LoginComponent
    }
]


@NgModule({
  imports:[RouterModule.forRoot(APP_ROUTES, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
