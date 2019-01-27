import { Observable } from 'rxjs';

export interface StatusTicketService{

  findAllStatus(): Observable<any>;
}
