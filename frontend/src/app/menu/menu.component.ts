import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { Shelfs } from '../models/shelf.model';
import { UserLogged } from '../models/user.model';
import { AuthService } from '../auth.service';

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
      this.data = [];
      shelfs.rows.forEach(shelf => {
        this.data.push({
          id: +shelf.usid,
          shelf: shelf.shelf,
          icon: shelf.icon,
          link: '/shelf/' + shelf.usid
        })
      })
      console.log(this.currentUser);
      if (this.currentUser.profile === 'Administrateur') {
        this.data.push({
          id: 0,
          name: 'Configuration',
          icon: 'eva eva-settings',
          link: '/settings'
        })
      }
    });
  }
}
