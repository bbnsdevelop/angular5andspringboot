import { Ticket } from "../model/ticket.model";

export interface TicketService {

  createOrUpdate(ticket: Ticket);
  findAll(page: number, count: number);
  findById(id: number);
  findParameter(page: number, count: number, assigned: boolean, t: Ticket);
  changeStatus(status: string, ticket: Ticket);

}
