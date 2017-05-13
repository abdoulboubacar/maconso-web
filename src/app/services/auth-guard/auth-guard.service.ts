import { Injectable } from '@angular/core';
import {StorageService} from "../storage/storage.service";
import {Router, CanActivate} from "@angular/router";
import {isNullOrUndefined} from "util";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
import {UserModel} from "../../models/user.model";

@Injectable()
export class AuthGuardService implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private storageService: StorageService, private router: Router) { }

  canActivate() {
    let user: UserModel = this.storageService.read('user');
    if (!isNullOrUndefined(user)) {
      return true;
      //return !this.jwtHelper.isTokenExpired(user.accessToken);
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
