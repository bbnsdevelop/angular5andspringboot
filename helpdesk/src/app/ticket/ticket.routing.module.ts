import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserGuard } from '../security/guards/user.guard';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketGuard } from '../security/guards/ticket.guard';

const TICKET_ROUTES: Routes = [
    {path : '', component : TicketNewComponent, canActivateChild: [TicketGuard] },
  //{path : 'list', component : UserListComponent, canActivateChild: [UserGuard] },
  //{path : ':id', component : DetailsUserComponent, canActivateChild: [UserGuard] }

];

@NgModule({
  imports:[RouterModule.forChild(TICKET_ROUTES)],
  exports: [RouterModule]
})
export class TicketRoutingModule {


}
