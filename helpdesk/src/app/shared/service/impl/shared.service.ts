import { CurrentUser } from './../../model/current-user.model';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  public static instance: SharedService = null;
  user: User;
  token: string;
  showTemplate = new EventEmitter<boolean>();
  search = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService;
    }
    return this.instance;
  }
  isLoggedIn(): boolean{
    if(this.user == null){
      let currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(currentUser){
        this.user = currentUser.user;
        this.token = currentUser.token
        this.showTemplate.emit(true);
      }else{
        return false;
      }
    }
    return this.user.email != '';
  }
}
