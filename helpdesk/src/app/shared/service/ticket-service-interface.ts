import { Ticket } from "../model/ticket.model";
import { Observable } from 'rxjs';

export interface TicketService {

  createOrUpdate(ticket: Ticket):Observable<any>;
  findAll(page: number, count: number):Observable<any>;
  findById(id: number):Observable<any>;
  findParameter(page: number, count: number, assigned: boolean, t: Ticket):Observable<any>;
  changeStatus(status: string, ticket: Ticket):Observable<any>;

}
