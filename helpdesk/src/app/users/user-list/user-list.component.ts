import { UserServiceImpl } from './../../shared/service/impl/user.service';
import { UserService } from './../../shared/service/user-service-interface';
import { SharedService } from './../../shared/service/impl/shared.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/user.model';
import { DialogoService } from '../service/dialog.service';
import { Router } from '@angular/router';
import { Response } from '../../shared/model/response.model';
import { Utils } from '../../shared/utils/Utils';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page: number = 0;
  count: number = 5;
  pages:Array<number>
  shared: SharedService;
  message: {};
  classCss: {};
  listUser: Array<User>;
  private userService: UserService;

  constructor(private dialogService: DialogoService, private userServiceImpl: UserServiceImpl, private router: Router) {
    this.shared = SharedService.getInstance();
    this.userService = this.userServiceImpl;
  }

  ngOnInit() {
    this.findAllUser(this.page, this.count);
  }

  findAllUser(page: number, count: number){
    this.userService.findAll(page, count).subscribe((response: Response) =>{
      this.listUser = response['data']['content'];
      this.pages = new Array(response['data']['totalPages']);
    }, error =>{
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      this.message = undefined
    }, 3000);
  }



}
