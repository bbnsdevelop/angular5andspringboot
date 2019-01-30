import { PriorityServiceImpl } from './../../shared/service/impl/priority.service';
import { PriorityService } from './../../shared/service/priority.service.interface';
import { Priority } from './../../shared/model/priority.model';
import { Utils } from './../../shared/utils/Utils';
import { Ticket } from './../../shared/model/ticket.model';
import { Response } from '../../shared/model/response.model';
import { Status } from '../../shared/model/status.model';
import { StatusTicketService } from '../../shared/service/status-ticket.service.interface';
import { StatusTicketServiceImpl } from '../../shared/service/impl/status-ticket.service';
import { TicketService } from './../../shared/service/ticket-service-interface';
import { TicketServiceImpl } from './../../shared/service/impl/ticket.service';
import { SharedService } from './../../shared/service/impl/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  assignedToMe: boolean = false;
  page: number = 0;
  pageIndex: number = 0;
  count: number = 4;
  pages: Array<number> = new Array();
  message: {type: string, text:string};
  classCss: {};
  ticketService: TicketService;
  priorityService: PriorityService;
  statusTicketService: StatusTicketService;
  shared: SharedService;
  tickets: Array<Ticket> = new Array();
  ticketFilter: Ticket = null;
  ticketClick: Ticket;
  searchAgain: boolean = false;
  ticketSearchForms: FormGroup;
  priorities: Array<Priority> = new Array()
  status: Array<Status> = new Array()
  search: boolean = false;

  constructor(private formBuilder: FormBuilder, private ticketServiceImpl: TicketServiceImpl, private router: Router,
              private priorityServiceImpl: PriorityServiceImpl, private statusTicketServiceImpl: StatusTicketServiceImpl) {
    this.shared = SharedService.getInstance();
    this.ticketService = this.ticketServiceImpl;
    this.priorityService = this.priorityServiceImpl;
    this.statusTicketService = this.statusTicketServiceImpl;
  }

  ngOnInit() {
    this.search = true;
    this.instanceOfForms();
    this.getPriority();
    this.getStatus();
    this.findAllTicket(this.page, this.count);
  }

  filter(){
    this.tickets = null;
    if(this.search){
      this.page = 0;
      this.findAllTicket(this.page, this.count);
    }else{
      this.page = 0;
      this.getFilterTicket();
      this.ticketService.findParameter(this.page, this.count, this.assignedToMe, this.ticketFilter)
        .subscribe((response: Response) =>{
          this.ticketFilter.title = this.ticketFilter.title == 'uninformed' ? '': this.ticketFilter.title;
          this.ticketFilter.number = this.ticketFilter.number == 0 ? null: this.ticketFilter.number;
          this.tickets = response['data']['content'];
          this.convertStatusAndPriority();
          this.pages = new Array(response['data']['totalPages']);
        }, error =>{
          this.showMessage({
            type: 'error',
            text: error['error']['message']
          });
          Utils.isHttp = true;
        });
      }
  }
  convertStatusAndPriority(): any {
    this.tickets.forEach((t: Ticket ) =>{
      this.priorities.forEach((p : Priority) =>{
        if(t.priority == p.descriptionBack){
          t.priority = p.descriptionView;
        }
      });
      this.status.forEach((s: Status) =>{
        if(t.status == s.descriptionBack){
          t.status = s.descriptionView;
        }
      });
    });
  }
  searchFilter(){
    if(this.search){
      this.search = false;
    }
    else if(this.verifyIfFormHasValue(false)){
      this.search = false;
    }else{
      this.search = true;
    }
  }
  private verifyIfFormHasValue(clear: boolean) : boolean {
    if(clear){
      return this.ticketSearchForms.get('number').value == null
      || this.ticketSearchForms.get('title').value == null
      || this.ticketSearchForms.get('status').value == null
      || this.ticketSearchForms.get('priority').value == null
      || this.ticketSearchForms.get('assignedToMe').value == null;
    }else{
      return this.ticketSearchForms.get('number').value && this.ticketSearchForms.get('number').dirty
      || this.ticketSearchForms.get('title').value && this.ticketSearchForms.get('title').dirty
      || this.ticketSearchForms.get('status').value && this.ticketSearchForms.get('status').dirty
      || this.ticketSearchForms.get('priority').value && this.ticketSearchForms.get('priority').dirty
      || this.ticketSearchForms.get('assignedToMe').value && this.ticketSearchForms.get('assignedToMe').dirty
    }
  }
  cleanFilter(){
    if(this.verifyIfFormHasValue(true)){
      this.search = true;
    }
    this.instanceOfForms();
    this.page = 0;
    this.ticketFilter = null;
    this.findAllTicket(this.page, this.count);
    return false;
  }

  edit(id: string){
    this.router.navigate(['/ticket', id]);
  }
  detail(id: string){
    this.router.navigate(['/ticket/details', id]);
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length ){
      this.page = this.page + 1;
      this.pageIndex = this.page + 1;
      this.findAllTicket(this.page, this.count);
    }
  }
  setPreviosPage(event:any){
    event.preventDefault();
    if(this.page + 1 > 0 ){
      this.page = this.page - 1;
      this.pageIndex = this.page - 1;
      this.findAllTicket(this.page, this.count);
    }
  }
  setPage(i:number, event:any){
    event.preventDefault();
    this.page = i;
    this.pageIndex = i;
    this.findAllTicket(this.page, this.count);
  }

  getClassPage():{} {
    return {'pagination-focus' : this.pageIndex == this.page}
  }

  getTicket(i: number, event: any){
    this.ticketClick = this.tickets[i];
    this.shared.search.subscribe(
      (search: boolean) => this.searchAgain = search
    );
    if(this.searchAgain){
      this.pages = [this.pages.length -1]
      if(this.page + 1 < this.pages.length ){
        this.setNextPage(event);
      }else if(this.page + 1 > 0){
        this.setPreviosPage(event);
      }
    }
    this.searchAgain = false;
    this.shared.search.emit(false);
  }
  private getPriority(): void {
    this.priorityService.findAllPriority().subscribe((response: Array<Priority>) =>{
      this.priorities = response;
    });
  }
  getStatus(){
    this.statusTicketService.findAllStatus().subscribe((response: Array<Status>) =>{
      this.status = response;
    });
  }

  private findAllTicket(page: number, count: number): void {
    this.ticketService.findAll(page, count).subscribe((response: Response) =>{
      this.tickets = response['data']['content'];
      this.convertStatusAndPriority();
      this.pages = new Array(response['data']['totalPages']);
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
    }, 3000);
  }

  private instanceOfForms(){
    this.ticketSearchForms = this.formBuilder.group({
      title: [null, [Validators.minLength(4)]],
      number: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(4)]],
      status: [null],
      priority: [null],
      assignedToMe: [false]
    });
    this.assignedToMe = this.ticketSearchForms.get('assignedToMe').value;
  }
  getFilterTicket(): void {
    this.ticketFilter = new Ticket(
      null,
      this.ticketSearchForms.get('number').value == null ? 0 : this.ticketSearchForms.get('number').value,
      this.ticketSearchForms.get('title').value == null ? '' : this.ticketSearchForms.get('title').value,
      this.ticketSearchForms.get('status').value == null ? '' : this.ticketSearchForms.get('status').value,
      this.ticketSearchForms.get('priority').value == null ? '' : this.ticketSearchForms.get('priority').value,
      null, null,
      this.ticketSearchForms.get('assignedToMe').value,
      null, null, null);

  }
}
