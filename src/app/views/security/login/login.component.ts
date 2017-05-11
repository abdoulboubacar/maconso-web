import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
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
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.storageService.clear();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.loginService.logout().subscribe(
      success => {},
      error => {}
    );
  }

  login() {
    this.loginService.login(this.credentials).subscribe(
      user => {
        this.user = user;
        this.authenticationFailed = false;
        this.storageService.save('user', user);
        // this.router.navigate(['/'])
        window.location.href = '/';
      },
      error => {
        this.authenticationFailed = true;
      }
    );
  }
}
