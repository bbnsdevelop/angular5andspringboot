import { TicketServiceImpl } from './../../service/impl/ticket.service';
import { TicketService } from './../../service/ticket-service-interface';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user.model';
import { Response } from '../../model/response.model';
import { Utils } from '../../utils/Utils';
import { UserService } from '../../service/user-service-interface';
import { UserServiceImpl } from '../../service/impl/user.service';
import { SharedService } from '../../service/impl/shared.service';
import { Ticket } from '../../model/ticket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  shared: SharedService;
  @Input('userModal') userComponent: User;
  @Input('isUserModal') isUser: boolean;
  @Input('ticketModal') ticketComponent: Ticket;
  @Input('isTicketModal') isTicket: boolean;

  message: {type: string, text: string};
  classCss: {};
  private userService: UserService;
  ticketService: TicketService;
  closePopup: boolean = false;

  constructor(private router: Router, private userServiceImpl: UserServiceImpl, private ticketServiceImpl: TicketServiceImpl,) {
    this.shared = SharedService.getInstance();
      this.userService = this.userServiceImpl;
      this.ticketService = this.ticketServiceImpl;
    }

  ngOnInit() {

  }

  delete(){
    if(this.isUser){
      this.message = null;
        this.userService.delete(this.userComponent.id).subscribe((response: Response) =>{
          this.showMessage({
            type: 'success',
            text: response.data
          });
          this.closePopup = true;
        }, error =>{
          this.showMessage({
            type: 'error',
            text: error['error']['message']
          });
          Utils.isHttp = true;
        })
    }else if(this.isTicket){
      this.ticketService.delete(this.ticketComponent.id).subscribe((response: Response) =>{
        this.showMessage({
          type: 'success',
          text: response.data
        });
        this.closePopup = true;
      }, error =>{
        this.showMessage({
          type: 'error',
          text: error['error']['message']
        });
        Utils.isHttp = true;
      })
    }

  }
  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      if(message.type == 'error' && Utils.isCallHttp()){
        this.router.navigate(['/login']);
        this.shared.user = null;
        this.shared.token = null;
        this.shared.showTemplate.emit(false);
      }
    }, 3000);
  }

  close(){
    if(this.closePopup){
      this.shared.search.emit(true);
    }
  }
}
