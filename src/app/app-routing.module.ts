import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import {CreateCarComponent} from './create-car/create-car.component';
import {CarDetailsComponent} from './car-details/car-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cars/add', component: CreateCarComponent, canActivate: [AuthGuard] },
  { path: 'car/:id', component: CarDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
