import { Ticket } from './../../model/ticket.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-modal-redirect',
  templateUrl: './modal-redirect.component.html',
  styleUrls: ['./modal-redirect.component.css']
})
export class ModalRedirectComponent implements OnInit {

  constructor(private router: Router) { }

  @Input('userModal') userComponent: User;
  @Input('ticketModal') ticketComponent: Ticket;
  @Input('modalIsUser') isUser: boolean;
  @Input('modalIsTicket') isTicket: boolean;

  ngOnInit() {
  }

  rertunToList(){
    if(this.isUser){
      this.router.navigate(['user/list']);
    }else if(this.isTicket){
      this.router.navigate(['/ticket/list']);
    }
  }
}
