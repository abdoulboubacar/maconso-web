import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AskRecoverService} from "../../../services/askrecover/askrecover.service";
import {StorageService} from "../../../services/storage/storage.service";

@Component({
  selector: 'app-askrecover',
  templateUrl: './askrecover.component.html',
  styleUrls: ['./askrecover.component.scss']
})
export class AskRecoverComponent implements OnInit {

  askrecoverFailed: boolean;
  emailCtrl: FormControl;
  askrecoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private askrecoverService: AskRecoverService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.askrecoverFailed = false;

    this.emailCtrl = this.fb.control('', Validators.required);

    this.askrecoverForm = this.fb.group({
      email: this.emailCtrl,
    });

  }

  askrecover() {
    const emailUser = {
      email: this.askrecoverForm.value.email
    };

    this.askrecoverService.askrecover(emailUser).subscribe(
      success => {
        this.storage.save('user', success);
        this.router.navigate(['']);
      },
      error => {
        this.askrecoverFailed = true;
      }
    );
  }

}
