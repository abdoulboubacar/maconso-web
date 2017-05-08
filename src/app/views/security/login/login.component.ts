import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage/storage.service";
import {UserModel} from "../../../../models/user.model";
import {LoginService} from "../../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: UserModel;

  credentials = {
    email: '',
    password: ''
  };
  authenticationFailed = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.loginService.logout().subscribe(
      success => {
        this.storageService.clear();
      },
      error => {}
    );
  }

  login() {
    this.loginService.login(this.credentials).subscribe(
      success => {
        this.user = success;
        this.authenticationFailed = false;
        this.storageService.save('user', success);
        window.location.href = '/';
      },
      error => {
        this.authenticationFailed = true;
      }
    );
  }
}
