import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { Shelfs } from '../models/shelf.model';
import { UserLogged } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'mmb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  data = [];
  resultsLength = 0;

  constructor(private auth: AuthService, private shelf: ShelfService) { }

  currentUser: UserLogged = this.auth.getUser();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.shelf.getShelfs().subscribe((shelfs: Shelfs) => {
      this.shelf.myShelfs = [];
      shelfs.rows.forEach(shelf => {
        this.shelf.myShelfs.push({
          id: +shelf.shelf_id,
          shelf: shelf.shelf,
          icon: shelf.icon,
          link: '/shelf/' + shelf.shelf_id
        });
      });
      this.shelf.myShelfs.push({
        id: 0,
        shelf: 'Configuration',
        icon: 'eva eva-settings-outline',
        link: '/settings'
      });
    });
  }
}
