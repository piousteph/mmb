import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { getDeepFromObject } from '@nebular/auth/helpers';
import { NbThemeModule, NbLayoutModule, NbUserModule, NbSidebarModule, NbSidebarService } from '@nebular/theme';
import { NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions, NbAuthJWTToken, NbAuthModule } from '@nebular/auth';

import { AuthService } from './auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtInterceptor } from './jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://127.0.0.1:3080/user/',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
            getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
              res.body,
              options.token.key,
            ),
          }
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          rememberMe: false
        },
        register: false,
        requestPass: false,
        requestPassword: false,
      },
    }),
    NbUserModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    NbSidebarService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
