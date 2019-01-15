import { ActivatedRoute } from '@angular/router';
import { UserServiceImpl } from './../../shared/service/impl/user.service';
import { UserService } from './../../shared/service/user-service-interface';
import { SharedService } from './../../shared/service/impl/shared.service';
import { User } from './../../shared/model/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Response } from '../../shared/model/response.model';
import { Utils } from '../../shared/utils/Utils';
import { ProfileServiceImpl } from '../../shared/service/impl/profile.service';
import { ProfileService } from '../../shared/service/profile-service';
import { Profile } from '../../shared/model/profile.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  userNewFormulario: FormGroup;
  user = new User('','','','');
  shared: SharedService;
  message: {type: string, text:string};
  classCss: {};
  userService: UserService;
  profileService: ProfileService;
  profiles: Array<Profile>;

  constructor(private formBuilder: FormBuilder, private userServiceImpl: UserServiceImpl, private route: ActivatedRoute,
              private profileServiceImpl: ProfileServiceImpl) {
    this.shared = SharedService.getInstance();
    this.userService = this.userServiceImpl;
    this.profileService = this.profileServiceImpl;

  }

  ngOnInit() {
    this.instanceOfForms();
    this.getProfiles();
  }

  register(){
    this.message = null;
    this.getUserForms();
    this.userService.createOrUpdate(this.user).subscribe((response: Response) =>{
      this.user = new User('','','','');
      let user: User = response.data;
      this.instanceOfForms();
      this.showMessage({
          type: 'success',
          text: `Registered ${user.email} successfully`
        });
    }, error =>{
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    })
  }

  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      this.message = undefined
    }, 3000);
  }

  getClassFormGroupClass(isValid: boolean, isDirty: boolean):{} {
    return Utils.getFormGroupClass(isValid, isDirty);
  }

  private instanceOfForms(){
    this.userNewFormulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(6), Validators.required]],
      profile: [null, [Validators.required]]
    });
  }

  private getProfiles(): void {
    this.profileService.getProfiles().subscribe((response: Array<Profile>)=>{
      this.profiles = response;
    }, error =>{
      this.showMessage({
        type: 'error',
        text: `Erro ao buscar profiles: ${error}`
      });
    })
  }

  private getUserForms(): void{
    let email: string = this.userNewFormulario.get('email').value;
    let password: string = this.userNewFormulario.get('password').value;
    let profile: string = this.userNewFormulario.get('profile').value;
    this.user = new User(null, email, password, profile);
  }








}
