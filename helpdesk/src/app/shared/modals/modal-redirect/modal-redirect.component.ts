import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-modal-redirect',
  templateUrl: './modal-redirect.component.html',
  styleUrls: ['./modal-redirect.component.css']
})
export class ModalRedirectComponent implements OnInit {

  constructor(private router: Router) { }
  @Input('userModal') userComponent: User;

  ngOnInit() {
  }

  rertunToList(){
    this.router.navigate(['user/list']);
  }
}
