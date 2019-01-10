import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/guards/auth.guard';

import { UserNewComponent } from './user-new/user-new.component';
import { UserListComponent } from './user-list/user-list.component';

const CURSOS_ROUTES: Routes = [
  {path : '', component : UserListComponent, /* canActivate: [AuthGuard]*/
  children: [
    { path : 'list', component : UserListComponent, /* canActivate: [AuthGuard]*/ }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(CURSOS_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {


}
