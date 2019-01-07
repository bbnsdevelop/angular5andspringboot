import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TicketService } from '../ticket-service-interface';
import { Ticket } from '../../model/ticket.model';
import { HELP_DESK_API } from '../../config/help-desk-api';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceImpl implements TicketService {

  private TICKETAPI = '/api/ticket';

  constructor(private http: HttpClient) {

  }

  createOrUpdate(ticket: Ticket){
    if(ticket.id != null || ticket.id != ''){
      return this.http.put(`${HELP_DESK_API}${this.TICKETAPI}`, ticket);
    }else{
      return this.http.post(`${HELP_DESK_API}${this.TICKETAPI}`, ticket);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HELP_DESK_API}${this.TICKETAPI}/${page}/${count}`);
  }

  findById(id: number){
    return this.http.get(`${HELP_DESK_API}${this.TICKETAPI}/${id}`);
  }

  delete(id: number){
    return this.http.delete(`${HELP_DESK_API}${this.TICKETAPI}/${id}`);
  }

  findParameter(page: number, count: number, assigned: boolean, t: Ticket){
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title == '' ? 'uninformed' : t.title;
    t.status = t.status == '' ? 'uninformed' : t.status;
    t.priority = t.priority == '' ? 'uninformed' : t.priority;
    return this.http.get(`${HELP_DESK_API}${this.TICKETAPI}/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assigned}`);
  }

  changeStatus(status: string, ticket: Ticket){
    return this.http.put(`${HELP_DESK_API}${this.TICKETAPI}/${ticket.id}/${status}`, ticket);
  }



}
