import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketGuard } from '../security/guards/ticket.guard';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { DetailsTicketComponent } from './ticket-list/details-ticket/details-ticket.component';

const TICKET_ROUTES: Routes = [
    {path : '', component : TicketNewComponent, canActivateChild: [TicketGuard] },
    {path : 'list', component : TicketListComponent, canActivateChild: [TicketGuard] },
    {path : ':id', component : TicketNewComponent, canActivateChild: [TicketGuard] },
    {path : 'details/:id', component : DetailsTicketComponent, canActivateChild: [TicketGuard] }

];

@NgModule({
  imports:[RouterModule.forChild(TICKET_ROUTES)],
  exports: [RouterModule]
})
export class TicketRoutingModule {


}
