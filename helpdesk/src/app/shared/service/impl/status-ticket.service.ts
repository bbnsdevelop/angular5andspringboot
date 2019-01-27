import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriorityService } from '../priority.service.interface';
import { Observable } from 'rxjs';
import { StatusTicketService } from '../status-ticket.service.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusTicketServiceImpl implements StatusTicketService{

  constructor(private http: HttpClient) { }


  findAllStatus(): Observable<any>{
    return this.http.get('/assets/jsons/data/status.json');
  }
}
