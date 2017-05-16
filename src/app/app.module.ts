import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import { AppComponent } from './app.component';
import {HttpService} from "./services/http/http.service";
import {LoginService} from "./services/login/login.service";
import {StorageService} from "./services/storage/storage.service";
import {LoginComponent} from "./views/security/login/login.component";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";
import {RegisterComponent} from './views/security/register/register.component';
import {RecoverComponent} from './views/security/recover/recover.component';
import {RegisterService} from "./services/register/register.service";
import {RecoverService} from "./services/recover/recover.service";
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
import {StateService} from "./services/state/state.service";
import {ChartsModule} from "ng2-charts";
import {UserResolver} from "./resolvers/user-resolver/user-resolver.service";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { StateModalComponent } from './components/state-modal/state-modal.component';
import {DateFilterPipe} from "./pipes/date-filter/date-filter.pipe";
import { SwitchComponent } from './components/switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    DashboardComponent,
    DealComponent,
    DealModalComponent,
    ChartComponent,
    LowerPipe,
    UpperFirstPipe,
    FooterComponent,
    HeaderComponent,
    StateModalComponent,
    DateFilterPipe,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    ModalModule,
    ChartsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: Http, useClass: HttpService },
    LoginService,
    RegisterService,
    RecoverService,
    StorageService,
    AuthGuardService,
    DealService,
    ResourceService,
    StateService,
    UserResolver
  ],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
