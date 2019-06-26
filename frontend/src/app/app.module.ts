import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { getDeepFromObject } from '@nebular/auth/helpers';
import { NbThemeModule,
  NbLayoutModule,
  NbUserModule,
  NbSidebarModule,
  NbSidebarService,
  NbRouteTabsetModule,
  NbTabsetModule,
  NbCardModule,
  NbToastrModule,
  NbDialogModule,
  NbInputModule } from '@nebular/theme';
import { NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions, NbAuthJWTToken, NbAuthModule } from '@nebular/auth';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { JwtInterceptor } from './auth/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ShelfsComponent } from './shelfs/shelfs.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersSettingsComponent } from './settings/users/users-settings.component';
import { ShelfsSettingsComponent } from './settings/shelfs/shelfs-settings.component';
import { ShelfIconRenderComponent } from './settings/shelfs/icon/shelf-icon-render.component';
import { ShelfIconEditorComponent } from './settings/shelfs/icon/shelf-icon-editor.component';
import { ShelfIconSelectorComponent } from './settings/shelfs/icon/shelf-icon-selector.component';

import { MediaComponent } from './shelfs/media/media.component';
import { MediaEditComponent } from './shelfs/media/media-edit/media-edit.component';

import { ProvidersComponent } from './providers/provider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ShelfsComponent,
    SettingsComponent,
    UsersSettingsComponent,
    ShelfsSettingsComponent,
    ShelfIconRenderComponent,
    ShelfIconEditorComponent,
    ShelfIconSelectorComponent,
    MediaComponent,
    MediaEditComponent,
    ProvidersComponent
  ],
  entryComponents: [
    ShelfIconRenderComponent,
    ShelfIconEditorComponent,
    ShelfIconSelectorComponent,
    MediaEditComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbCardModule,
    NbInputModule,
    Ng2SmartTableModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),

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
