import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { User, UserLogged } from './models/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    _isLogged: boolean = false;
    _user: UserLogged

    constructor(private authService: NbAuthService) {
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
            if (token.isValid()) {
              this._user = token.getPayload();
              this._isLogged = true;
              console.log('Logged')
            } else {
              this._isLogged = false;
              console.log('NOT Logged')
            }
          });      
    }

    isLogged(): boolean {
        return this._isLogged;
    }

    getUser(): UserLogged {
        return this._user;
    }
}