import { Status } from './status.model';
import { User } from './user.model';
import { Ticket } from './ticket.model';
export class ChangesStatus{

  constructor(
    public id: string,
    public ticket: Ticket,
    public userChange: User,
    public dateChangeStatus: string,
    public status: Status){

  }
}
