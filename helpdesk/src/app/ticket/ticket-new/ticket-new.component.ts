import { User } from './../../shared/model/user.model';
import { Utils } from './../../shared/utils/Utils';
import { TicketService } from './../../shared/service/ticket-service-interface';
import { TicketServiceImpl } from './../../shared/service/impl/ticket.service';
import { SharedService } from './../../shared/service/impl/shared.service';
import { Ticket } from './../../shared/model/ticket.model';
import { Response } from '../../shared/model/response.model';
import { Priority } from '../../shared/model/priority.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriorityService } from '../../shared/service/priority.service.interface'
import { PriorityServiceImpl } from '../../shared/service//impl/priority.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  message: {type: string, text:string};
  classCss: {};
  ticketNewFormulario: FormGroup;
  ticket: Ticket = new Ticket('',0,'','','','',null,null,'', null, null);
  shared: SharedService
  ticketService: TicketService;
  priorityService: PriorityService;
  priorities: Array<Priority> = new Array()
  update: boolean = false;
  canDoUpdate: boolean = true;

  constructor(private formBuilder: FormBuilder, private ticketServiceImpl: TicketServiceImpl, private priorityServiceImpl: PriorityServiceImpl, private route: ActivatedRoute, private router: Router) {
    this.shared = SharedService.getInstance();
    this.ticketService = this.ticketServiceImpl;
    this.priorityService = this.priorityServiceImpl;
  }

  ngOnInit() {
    this.update = false;
    this.instanceOfForms();
    this.getPriority();
    this.findByid();
  }

  register(){
    this.message = null;
    if(this.update){
        this.getFormsFormsUpdate();
        this.ticketService.createOrUpdate(this.ticket).subscribe((response: Response) =>{
        this.ticket = new Ticket('',0,'','','','',null,null,'', null, null);
        let ticket: Ticket = response.data;
          this.showMessage({
            type: 'success',
            text: `Updated ${ticket.title} successfully`
          });
      }, error =>{
        this.showMessage({
          type: 'error',
          text: error['error']['errors'][0]
        });
      });
    }else{
        this.getFormsForms();
        this.ticketService.createOrUpdate(this.ticket).subscribe((response: Response) =>{
        this.ticket = new Ticket('',0,'','','','',null,null,'', null, null);
        let ticket: Ticket = response.data;
        this.instanceOfForms();
          this.showMessage({
            type: 'success',
            text: `Registered ${ticket.title} successfully`
          });
      }, error =>{
        this.showMessage({
          type: 'error',
          text: error['error']['errors'][0]
        });
      });
    }

  }
  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      this.message = undefined
      if(this.update){
        this.router.navigate(['/ticket/list']);
      }
    }, 3000);
  }

  private instanceOfForms(){
    this.ticketNewFormulario = this.formBuilder.group({
      title: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null]
    });
  }

  private updateForms(ticket: Ticket): void {
    this.ticketNewFormulario.patchValue({
      title: ticket.title,
      priority: ticket.priority,
      description: ticket.description,
    });
    this.ticket = ticket;
    this.update = true;
  }


  getClassFormGroupClass(isValid: boolean, isDirty: boolean):{} {
    return Utils.getFormGroupClass(isValid, isDirty);
  }

  private getFormsForms(): void{
    let title: string = this.ticketNewFormulario.get('title').value;
    let priority: string = this.ticketNewFormulario.get('priority').value;
    let description: string = this.ticketNewFormulario.get('description').value;
    let image: string = this.ticket.image;
    this.ticket = new Ticket(null,null, title, null, priority, image, null, null, null, null, description);
  }
  getFormsFormsUpdate(): void{
    let title: string = this.ticketNewFormulario.get('title').value;
    let priority: string = this.ticketNewFormulario.get('priority').value;
    let description: string = this.ticketNewFormulario.get('description').value;
    let image: string = this.ticket.image;
    this.ticket = new Ticket(this.ticket.id,this.ticket.number, title, this.ticket.status, priority, image, this.ticket.user, this.ticket.assignedUser, this.ticket.date, this.ticket.changes, description);
  }

  private getPriority(): void {
    this.priorityService.findAllPriority().subscribe((response: Array<Priority>) =>{
      this.priorities = response;
    });
  }

  private findByid(): void {
    let id = this.getUserId();
    if(id){
      this.ticketService.findById(id).subscribe((response: Response) =>{
        let ticket: Ticket = response.data;
        this.updateForms(ticket);
      }, error =>{
        this.showMessage({
          type: 'error',
          text: error['error']['errors'][0]
        });
      });
    }
  }

  private getUserId(): string{
    return this.route.snapshot.params['id'];
  }


  onFileChange(event): void{
    if(event.target.files[0].size > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Maximum image is 2 MB'
      });
    }else{
      this.ticket.image = '';
      let reader = new FileReader();
      reader.onloadend = (e: Event) =>{
        let image = reader.result.toString();
        this.ticket.image = image;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
