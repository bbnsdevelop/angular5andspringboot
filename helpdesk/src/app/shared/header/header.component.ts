import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserServiceImpl } from '../service/impl/user.service'
import { UserService } from '../service/user-service-interface'
import { SharedService } from '../service/impl/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  shared: SharedService


  constructor(private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  singOut(){
    this.shared.token = null;
    this.shared.user = null;
    this.router.navigate(['/login'])
    //window.location.href = '/login';
    window.location.reload();
  }

}
