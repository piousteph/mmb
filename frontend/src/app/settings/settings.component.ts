import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'mmb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  constructor(public auth: AuthService, public metaService: MetaService) { }

  ngOnInit() {
  }
}
