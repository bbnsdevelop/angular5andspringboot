import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../model/ticket.model';
import { Response } from '../../model/response.model';
import { TicketService } from '../../service/ticket-service-interface';
import { SharedService } from '../../service/impl/shared.service';
import { TicketServiceImpl } from '../../service/impl/ticket.service';
import { Utils } from '../../utils/Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-change-status',
  templateUrl: './modal-change-status.component.html',
  styleUrls: ['./modal-change-status.component.css']
})
export class ModalChangeStatusComponent implements OnInit {

  @Input('titleModal') title: string;
  @Input('actionModal') action: string;
  @Input('statusModal') status: string;
  @Input('ticketModal') ticketComponent: Ticket;
  @Input('modalIsTicketModal') isTicket: boolean;

  message: {type: string, text:string};
  classCss: {};
  shared: SharedService
  ticketService: TicketService;

  constructor(private ticketServiceImpl: TicketServiceImpl, private router: Router) {
    this.shared = SharedService.getInstance();
    this.ticketService = this.ticketServiceImpl;
   }

  ngOnInit() {
  }

  changeStatus(){
    this.ticketService.changeStatus(this.status, this.ticketComponent).subscribe((response: Response) =>{
      this.ticketComponent = response.data;
      this.ticketComponent.date = new Date(this.ticketComponent.date).toISOString();
      this.showMessage({
        type: 'success',
        text: `Successfully chaned status: ${status}`
      });
    }, error =>{
      this.showMessage({
        type: 'error',
        text: error['error']['message']
      });
      Utils.isHttp = true;
    });
  }

  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      this.message = undefined
      if(message.type == 'error' && Utils.isCallHttp()){
        this.router.navigate(['/login']);
        this.shared.user = null;
        this.shared.token = null;
        this.shared.showTemplate.emit(false);
      }
      this.router.navigate(['/ticket/details', this.ticketComponent.id]);
    }, 3000);
  }

}
