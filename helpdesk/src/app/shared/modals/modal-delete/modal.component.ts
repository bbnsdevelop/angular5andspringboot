import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user.model';
import { Response } from '../../model/response.model';
import { Utils } from '../../utils/Utils';
import { UserService } from '../../service/user-service-interface';
import { UserServiceImpl } from '../../service/impl/user.service';
import { SharedService } from '../../service/impl/shared.service';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  shared: SharedService;
  @Input('userModal') userComponent: User;
  message: {type: string, text: string};
  classCss: {};
  private userService: UserService;
  closePopup: boolean = false;

  constructor(private userServiceImpl: UserServiceImpl) {
    this.shared = SharedService.getInstance();
      this.userService = this.userServiceImpl;
    }

  ngOnInit() {

  }

  delete(){
        this.message = null;
        this.userService.delete(this.userComponent.id).subscribe((response: Response) =>{
          this.showMessage({
            type: 'success',
            text: response.data
          });
          this.closePopup = true;
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
    /*setTimeout(() =>{
      this.message = undefined
    }, 3000);*/
  }

  close(){
    if(this.closePopup){
      this.shared.search.emit(true);
    }
  }
}
