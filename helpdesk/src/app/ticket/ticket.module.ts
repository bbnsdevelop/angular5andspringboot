import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TicketRoutingModule } from './ticket.routing.module'

import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { DetailsTicketComponent } from './ticket-list/details-ticket/details-ticket.component'

@NgModule({
  declarations: [
    TicketNewComponent,
    TicketListComponent,
    DetailsTicketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
