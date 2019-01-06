import { Component, OnInit } from '@angular/core';
import { UserServiceImpl } from '../service/impl/user.service'
import { UserService } from '../service/user-service-interface'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //private userService: UserService;

  constructor(/*private userServiceImpl: UserServiceImpl*/) {
    //this.userService = this.userServiceImpl;
  }

  ngOnInit() {
  }

}
