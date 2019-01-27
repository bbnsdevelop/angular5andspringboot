import { ProfileServiceImpl } from './../../shared/service/impl/profile.service';
import { ProfileService } from './../../shared/service/profile-service';
import { UserServiceImpl } from './../../shared/service/impl/user.service';
import { UserService } from './../../shared/service/user-service-interface';
import { SharedService } from './../../shared/service/impl/shared.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/user.model';
import { DialogService } from '../service/dialog.service';
import { Router } from '@angular/router';
import { Response } from '../../shared/model/response.model';
import { Utils } from '../../shared/utils/Utils';
import { Profile } from '../../shared/model/profile.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageIndex: number = 0;
  page: number = 0;
  count: number = 5;
  pages:Array<number>
  shared: SharedService;
  message: {type: string, text: string};
  classCss: {};
  listUser: Array<User> = new Array<User>();
  private userService: UserService;
  private profileService: ProfileService;
  profiles: Profile[];
  userClick: User;
  searchAgain: boolean = false;

  constructor(private userServiceImpl: UserServiceImpl,
              private router: Router, private profileServiceImpl: ProfileServiceImpl) {
    this.shared = SharedService.getInstance();
    this.userService = this.userServiceImpl;
    this.profileService = this.profileServiceImpl;
  }

  ngOnInit() {
    this.findAllUser(this.page, this.count);
  }

  findAllUser(page: number, count: number){
    this.userService.findAll(page, count).subscribe((response: Response) =>{
      this.listUser = response['data']['content'];
      this.pages = new Array(response['data']['totalPages']);
      this.findProfiles();
    }, error =>{
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }
  edit(id: string){
    this.router.navigate(['/user', id])
  }
  findProfiles(): void{
    this.profileService.getProfiles().subscribe((response: Array<Profile>) =>{
      this.profiles = response;
      this.listUser.forEach(u =>{
        let profile = this.profiles.filter(p => p.profile == u.profile);
        u.profile = profile[0].description;
      })
    })
  }
  /*
  delete(id: string){
    this.dialogService.confirm('Do you want to delete the user?')
    .then((canDelete: boolean)=>{
      if(canDelete){
        this.message = null;
        this.userService.delete(id).subscribe((response: Response) =>{
          this.showMessage({
            type: 'success',
            text: response.data
          });
          this.findAllUser(this.page, this.count);
        }, error =>{
          this.showMessage({
            type: 'error',
            text: error['error']['errors'][0]
          });
        })
      }
    });

  }*/

  setNextPage(event:any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length ){
      this.page = this.page + 1;
      this.pageIndex = this.page + 1;
      this.findAllUser(this.page, this.count);
    }
  }
  setPreviosPage(event:any){
    event.preventDefault();
    if(this.page + 1 > 0 ){
      this.page = this.page - 1;
      this.pageIndex = this.page - 1;
      this.findAllUser(this.page, this.count);
    }
  }
  setPage(i:number, event:any){
    event.preventDefault();
    this.page = i;
    this.pageIndex = i;
    this.findAllUser(this.page, this.count);
  }

  private showMessage(message :{type: string, text: string}): void {
    this.message = message;
    this.classCss = Utils.buildClass(message.type);
    setTimeout(() =>{
      this.message = undefined
    }, 3000);
  }

  getUser(i: number, event: any){
    this.userClick = this.listUser[i];
    this.shared.search.subscribe(
      (search: boolean) => this.searchAgain = search
    );
    if(this.searchAgain){
      this.pages = [this.pages.length -1]
      if(this.page + 1 < this.pages.length ){
        this.setNextPage(event);
      }else if(this.page + 1 > 0){
        this.setPreviosPage(event);
      }
    }
    this.searchAgain = false;
    this.shared.search.emit(false);
  }

  getClassPage():{} {
    return {'pagination-focus' : this.pageIndex == this.page}
  }



}
