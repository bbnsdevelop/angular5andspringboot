import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/guards/auth.guard';

import { UserNewComponent } from './user-new/user-new.component'

const CURSOS_ROUTES: Routes = [
  {path : '', component : UserNewComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports:[RouterModule.forChild(CURSOS_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {


}
