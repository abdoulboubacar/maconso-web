import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {RecoverService} from "../../../services/recover/recover.service";
import {StorageService} from "../../../services/storage/storage.service";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  recoverFailed: boolean;
  passwordCtrl: FormControl;
  passwordCheckCtrl: FormControl;
  recoverForm: FormGroup;
  passwordForm: FormGroup;

  static passwordMatch(control: FormGroup) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    return password !== confirmPassword ? {matchingError: true} : null;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recoverService: RecoverService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.recoverFailed = false;

    this.passwordCtrl = this.fb.control('', Validators.required);
    this.passwordCheckCtrl = this.fb.control('', Validators.required);

    this.passwordForm = this.fb.group({
      password: this.passwordCtrl,
      confirmPassword: this.passwordCheckCtrl
    }, {
      validator: RecoverComponent.passwordMatch
    });

    this.recoverForm = this.fb.group({
      passwordForm: this.passwordForm
    });
  }

  recover() {
    const updateUser = {
      password: this.recoverForm.value.passwordForm.password
    };

    this.recoverService.recover(updateUser).subscribe(
      success => {
        this.storage.save('user', success);
        this.router.navigate(['']);
      },
      error => {
        this.recoverFailed = true;
      }
    );
  }

}
