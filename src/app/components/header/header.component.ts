import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {StorageService} from "../../services/storage/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private user: UserModel;

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    // console.log('Storage', this.storageService.read('user'));
    // this.route.data.subscribe(data => {
    //   this.user = data['user'];
    //   console.log('HearComponent.resolver', this.user);
    // });
    // console.log('HearComponent', this.user);
    this.user = this.storageService.read('user');
  }

  logout() {
    this.storageService.clear();
    this.loginService.logout().subscribe(
      user => {
        this.user = UserModel.getAnonymousUser();
        this.storageService.save('user', user);
      },
      error => {
      }
    );
    window.location.href = '/';
  }

}
