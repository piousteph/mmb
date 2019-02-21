import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../services/media.service';
import { Media, Medias } from '../models/media.model';


@Component({
  selector: 'mmb-shelfs',
  templateUrl: './shelfs.component.html',
  styleUrls: ['./shelfs.component.scss']
})

export class ShelfsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private media: MediaService) { }

  private shelfId;
  private data = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shelfId = +params['id'];

      this.media.getMedias(this.shelfId).subscribe((medias: Medias) => {
        this.data = [];
        medias.rows.forEach(media => {
          this.data.push(media);
        });
      });
    });
  }
}
