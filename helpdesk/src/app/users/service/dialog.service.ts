import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogoService {

  confirm(message?: string){
    return new Promise( resolve =>{
      return resolve(window.confirm(message || 'Confirm ?'));
    })
  }

}
