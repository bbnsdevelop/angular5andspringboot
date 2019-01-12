import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNewComponent } from './user-new/user-new.component'

//import { routesUser } from './user.routes'
import { UserRoutingModule } from './user.routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { DetailsUserComponent } from './user-list/details-user/details-user.component'

@NgModule({
  declarations: [
    UserNewComponent,
    UserListComponent,
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  exports:[
   // UserNewComponent
  ]
})
export class UsersModule { }
