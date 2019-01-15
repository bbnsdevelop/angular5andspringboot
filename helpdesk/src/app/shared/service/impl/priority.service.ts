import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriorityService } from '../priority.service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorityServiceImpl implements PriorityService{

  constructor(private http: HttpClient) { }


  findAllPriority(): Observable<any>{
    return this.http.get('/assets/jsons/data/priority.json');
  }
}
