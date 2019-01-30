import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.interface';
import { HELP_DESK_API } from '../../../shared/config/help-desk-api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceImpl implements AuthenticationService{

  private AUTHENTICATIONAPI = '/api/authentication';

  constructor(private http: HttpClient) { }

  isAuthentication(): Observable<any> {
    return this.http.get(`${HELP_DESK_API}/${this.AUTHENTICATIONAPI}`);
  }
}
