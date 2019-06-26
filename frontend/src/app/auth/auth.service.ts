import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserLogged } from '../models/user.model';
import { MetaService } from '../services/meta.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _isLogged = false;
  private _user: UserLogged;

  constructor(private authService: NbAuthService, private metaService: MetaService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this._user = token.getPayload();
        this._isLogged = true;
        metaService.initMeta();
        console.log('Logged');
      } else {
        this._isLogged = false;
        console.log('NOT Logged');
      }
    });
  }

  isLogged(): boolean {
    return this._isLogged;
  }

  getUser(): UserLogged {
    return this._user;
  }

  isAdmin(): boolean {
    if (+this._user.profile_id === 1) {
      return true;
    } else {
      return false;
    }
  }
}
