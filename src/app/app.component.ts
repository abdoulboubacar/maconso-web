import {Component, OnInit} from '@angular/core';
import {StorageService} from "./services/storage/storage.service";
import {isNullOrUndefined} from "util";
import {UserModel} from "../models/user.model";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: UserModel;

  constructor(private storageService: StorageService, private route:ActivatedRoute) {

  }

  ngOnInit() {
    if (!isNullOrUndefined(this.storageService.read("user"))) {
      this.user = this.storageService.read("user");
    } else {
      this.user = new UserModel();
    }
  }

  logout() {
    this.storageService.clear();
    window.location.reload();
  }
}
