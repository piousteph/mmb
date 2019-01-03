import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService, private sidebarService: NbSidebarService) {}

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
