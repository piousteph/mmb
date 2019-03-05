import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService, private sidebarService: NbSidebarService, public router: Router) { }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  goToHome() {
    this.router.navigate(['Home']);
  }
}
