import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNewComponent } from './user-new/user-new.component'

//import { routesUser } from './user.routes'
import { UserRoutingModule } from './user.routing.module';
import { UserListComponent } from './user-list/user-list.component'

@NgModule({
  declarations: [
    UserNewComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  exports:[

  ]
})
export class UsersModule { }
