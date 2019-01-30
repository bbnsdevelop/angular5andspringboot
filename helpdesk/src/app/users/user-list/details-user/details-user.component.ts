import { Profile } from './../../../shared/model/profile.model';
import { Response } from './../../../shared/model/response.model';
import { User } from './../../../shared/model/user.model';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/impl/shared.service';
import { DialogService } from './../../service/dialog.service';
import { UserService } from '../../../shared/service/user-service-interface';
import { ProfileService } from '../../../shared/service/profile-service';
import { ProfileServiceImpl } from './../../../shared/service/impl/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceImpl } from '../../../shared/service/impl/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Utils } from '../../../shared/utils/Utils';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  shared: SharedService;
  message: {type: string, text:string};
  classCss: {};
  userService: UserService;
  profileService: ProfileService;
  userDetailsFormulario: FormGroup;
  update: boolean = false;
  user: User;
  profiles: Profile[];
  canRedirect: boolean = false;

  constructor(private userServiceImpl: UserServiceImpl, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private profileServiceImpl: ProfileServiceImpl, private dialogService: DialogService) {
    this.shared = SharedService.getInstance();
    this.userService = this.userServiceImpl;
    this.profileService = this.profileServiceImpl;
  }

  ngOnInit() {
    this.instanceOfForms();
    this.getProfiles();
    let id = this.getUserId();
    if(id != undefined){
      this.findByid(id);
    }
  }

  register(){
    if(!this.canRedirect){
      this.message = null;
      this.getUserForms();
      this.userService.createOrUpdate(this.user).subscribe((response: Response) =>{
        this.user = new User('','','','');
        let user: User = response.data;
        if(this.update){
          this.showMessage({
            type: 'success',
            text: `Updadte user ${user.email} successfully`
          });
        }
      }, error =>{
        this.showMessage({
          type: 'error',
          text: error['error']['message']
        });
        Utils.isHttp = true;
      })
    }
  }

  findByid(id: string){
    this.userService.findById(id).subscribe((response: Response) =>{
       this.writeUser(response);
    }, error =>{
      this.showMessage({
        type: 'error',
        text: error['error']['message']
      });
      Utils.isHttp = true;
    });
  }

  private getUserForms(): void{
    let id: string = this.userDetailsFormulario.get('id').value;
    let email: string = this.userDetailsFormulario.get('email').value;
    let password: string = this.userDetailsFormulario.get('password').value;
    let profile: string = this.userDetailsFormulario.get('profile').value;
    this.user = new User(id, email, password, profile);
  }

  private writeUser(response: Response): void {
    this.user = response.data;
    this.updateForms(this.user);
  }

  private updateForms(user: User){
    this.userDetailsFormulario.patchValue({
      id: user.id,
      email : user.email,
      password: user.password,
      profile: user.profile
    });

    this.update = true;
  }
  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      this.message = undefined
      if(message.type == 'error' && Utils.isCallHttp()){
        this.router.navigate(['/login']);
        this.shared.user = null;
        this.shared.token = null;
        this.shared.showTemplate.emit(false);
      }
    }, 3000);
  }

  private instanceOfForms(){
    this.userDetailsFormulario = this.formBuilder.group({
      id: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(6), Validators.required]],
      profile: [null, [Validators.required]]
    });
  }
  private getUserId(): string{
    return this.route.snapshot.params['id'];
  }
  getClassFormGroupClass(isValid: boolean, isDirty: boolean):{} {
    return Utils.getFormGroupClass(isValid, isDirty);
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

  rertunToList(){
    this.dialogService.confirm('When you redirect to the user list without saving, your changes will be lost. Do you want to redirect?')
      .then((canRedirect: boolean)=>{
        this.canRedirect = !canRedirect;
        if(canRedirect){
          this.router.navigate(['user/list']);
        }
      });
  }

}
