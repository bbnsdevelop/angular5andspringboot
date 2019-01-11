import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserNewComponent } from './user-new/user-new.component'
import { UserGuard } from '../security/guards/user.guard';
import { UserListComponent } from './user-list/user-list.component';

const CURSOS_ROUTES: Routes = [
  {path : '', component : UserNewComponent, canActivateChild: [UserGuard] },
  {path : 'list', component : UserListComponent, canActivateChild: [UserGuard] }

];

@NgModule({
  imports:[RouterModule.forChild(CURSOS_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {


}
