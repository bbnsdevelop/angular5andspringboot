import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/user.model';
import { SharedService } from '../../shared/service/impl/shared.service';
import { Router } from '@angular/router';
import { UserServiceImpl } from './../../shared/service/impl/user.service';
import { UserService } from '../../shared/service/user-service-interface';
import { CurrentUser } from '../../shared/model/current-user.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormulario: FormGroup;
  user = new User('','','','');
  shared: SharedService;
  message: string;
  userService: UserService;

  constructor(private userServiceImpl: UserServiceImpl, private router: Router, private formBuilder: FormBuilder, ) {
    this.shared = SharedService.getInstance();
    this.userService = this.userServiceImpl;
  }

  ngOnInit() {
    this.loginFormulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(6), Validators.required]]
    });
  }

  login(){
    this.message = '';
    this.user.email = this.loginFormulario.get('email').value;
    this.user.password = this.loginFormulario.get('password').value;
    if(this.user.email != null && this.user.password != null){
      this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) =>{
        this.shared.token = userAuthentication.token;
        this.shared.user = userAuthentication.user;
        this.shared.user.profile = this.shared.user.profile.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
      }, err =>{
        this.shared.token = null;
        this.shared.user = null;
        this.shared.showTemplate.emit(false);
        this.message = 'Erro';

      });
    }
  }
  cancelLogin(){
    this.user = new User('','','','');
    this.message = '';
    window.location.href = '/login';
    window.location.reload();
  }
  getClassFormGroupClass(isValid: boolean, isDirty: boolean):{} {
    return{
      'form-group': true,
      'has-error': isValid && isDirty,
      'has-success': !isValid && isDirty
    };
  }
}
