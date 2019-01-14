import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TicketRoutingModule } from './ticket.routing.module'

import { TicketNewComponent } from './ticket-new/ticket-new.component'

@NgModule({
  declarations: [
    TicketNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
