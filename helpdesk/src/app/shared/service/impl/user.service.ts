import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user.model';
import { HELP_DESK_API } from '../../config/help-desk-api';
import { UserService } from '../user-service-interface';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceImpl implements UserService {

  private AUTHENTICATION = '/api/auth';
  private USERAPI = '/api/user';

  constructor(private http: HttpClient) { }

  login(user: User):Observable<any>{
    return this.http.post(`${HELP_DESK_API}${this.AUTHENTICATION}`, user);
  }

  createOrUpdate(user: User):Observable<any>{
    if(user.id != null || user.id != ''){
      return this.http.post(`${HELP_DESK_API}${this.USERAPI}`,user);
    }else{
      return this.http.put(`${HELP_DESK_API}${this.USERAPI}`,user);
    }
  }

  findAll(page: number, count: number):Observable<any>{
    return this.http.get(`${HELP_DESK_API}${this.USERAPI}/${page}/${count}`);
  }

  findById(id: string):Observable<any>{
    return this.http.get(`${HELP_DESK_API}${this.USERAPI}/${id}`);
  }

  delete(id: string):Observable<any>{
    return this.http.delete(`${HELP_DESK_API}${this.USERAPI}/${id}`);
  }
}
