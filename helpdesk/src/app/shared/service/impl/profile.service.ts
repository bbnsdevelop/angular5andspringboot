import { Injectable } from '@angular/core';
import { ProfileService } from '../profile-service'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceImpl implements ProfileService{

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<any>{
    return this.http.get('/assets/jsons/data/profiles.json');
  }
}
