import { Utils } from './../../../shared/utils/Utils';
import { PriorityService } from './../../../shared/service/priority.service.interface';
import { TicketService } from './../../../shared/service/ticket-service-interface';
import { SharedService } from './../../../shared/service/impl/shared.service';
import { Ticket } from './../../../shared/model/ticket.model';
import { Response } from '../../../shared/model/response.model';
import { PriorityServiceImpl } from './../../../shared/service/impl/priority.service';
import { TicketServiceImpl } from './../../../shared/service/impl/ticket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.css']
})
export class DetailsTicketComponent implements OnInit {


  message: {type: string, text:string};
  classCss: {};
  ticket: Ticket = new Ticket('',0,'','','','',null,null,'', null, null);
  shared: SharedService
  ticketService: TicketService;
  priorityService: PriorityService;

  constructor(private router: Router, private ticketServiceImpl: TicketServiceImpl, private priorityServiceImpl: PriorityServiceImpl, private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
    this.ticketService = this.ticketServiceImpl;
    this.priorityService = this.priorityServiceImpl;
  }

  ngOnInit() {
    this.findByid();
  }

  private findByid(): void {
    let id = this.getUserId();
    if(id){
      this.ticketService.findById(id).subscribe((response: Response) =>{
        this.ticket = response.data;
        this.ticket.date = new Date(this.ticket.date).toISOString();
        //this.updateForms(ticket);
      }, error =>{
        this.showMessage({
          type: 'error',
          text: error['error']['message']
        });
        Utils.isHttp = true;
      });
    }
  }

  private getUserId(): string{
    return this.route.snapshot.params['id'];
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
    }, 3000);
  }



}
