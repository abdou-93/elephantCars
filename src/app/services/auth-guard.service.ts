import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public userService: UserService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.isLoggedInStream
      .map<boolean, boolean>((isLoggenIn: boolean) => {
        if (!isLoggenIn) {
          this.router.navigate(['/login']);
        }
        return isLoggenIn;
      });
  }
}
