import {Routes} from "@angular/router";
import {LoginComponent} from "./views/security/login/login.component";
import {RegisterComponent} from "./views/security/register/register.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {UserResolver} from "./resolvers/user-resolver/user-resolver.service";

export const ROUTES: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, resolve: { user: UserResolver}},
  {path: 'register', component: RegisterComponent, resolve: { user: UserResolver}},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], resolve: { user: UserResolver}},
]
