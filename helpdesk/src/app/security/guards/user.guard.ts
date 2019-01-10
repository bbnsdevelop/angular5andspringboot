import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/service/impl/shared.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild {

  constructor(private authGuard: AuthGuard) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>  | boolean  {
    return this.authGuard.canActivate(route, state);
  }
}
