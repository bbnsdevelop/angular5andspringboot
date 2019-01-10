import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNewComponent } from './user-new/user-new.component'

//import { routesUser } from './user.routes'
import { UserRoutingModule } from './user.routing.module'

@NgModule({
  declarations: [
    UserNewComponent
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
