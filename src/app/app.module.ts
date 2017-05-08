import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import { AppComponent } from './app.component';
import {HttpService} from "./services/http/http.service";
import {LoginService} from "./services/login/login.service";
import {StorageService} from "./services/storage/storage.service";
import {LoginComponent} from "./views/security/login/login.component";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";
import { RegisterComponent } from './views/security/register/register.component';
import {RegisterService} from "./services/register/register.service";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {BsDropdownModule, ModalModule} from "ngx-bootstrap";
import {DealService} from "./services/deal/deal.service";
import { DealComponent } from './components/deal/deal.component';
import { DealModalComponent } from './components/deal-modal/deal-modal.component';
import { ChartComponent } from './components/chart/chart.component';
import { LowerPipe } from './pipes/lower/lower.pipe';
import { UpperFirstPipe } from './pipes/upper-first/upper-first.pipe';
import {ResourceService} from "./services/resource/resource.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DealComponent,
    DealModalComponent,
    ChartComponent,
    LowerPipe,
    UpperFirstPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    ModalModule,
  ],
  providers: [
    { provide: Http, useClass: HttpService },
    LoginService,
    RegisterService,
    StorageService,
    AuthGuardService,
    DealService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
