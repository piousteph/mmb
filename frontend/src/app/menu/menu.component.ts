import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { Shelfs, Shelf } from '../models/shelf.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  data: Shelf[] = [];
  resultsLength = 0;

  constructor(private shelf: ShelfService) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.shelf.getShelfs().subscribe((shelfs: Shelfs) => {
      this.data = [];
      shelfs.rows.forEach(shelf => {
        this.data.push(new Shelf(
          +shelf.id,
          shelf.name
        ))
      })
    });
  }
}
