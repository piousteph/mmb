import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './services/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { ShelfsComponent } from './shelfs/shelfs.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      }
    ],
  }, {
    path: 'shelf/:id',
    component: ShelfsComponent
  }, {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent
  }, {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
