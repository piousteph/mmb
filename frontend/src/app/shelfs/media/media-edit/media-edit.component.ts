import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../../models/media.model';
import { environment } from 'src/environments/environment.prod';

const IMGUrl = environment.IMGUrl;

@Component({
    selector: 'mmb-media-edit',
    templateUrl: './media-edit.component.html',
    styleUrls: ['./media-edit.component.scss']
})
export class MediaEditComponent implements OnInit {

    @Input() media: Media;

    name: String = '';
    extra: String = '';
    image: String = '';

    constructor() { }

    ngOnInit(): void {
        console.log(this.media)
        this.name = this.media.name;
        this.extra = this.media.extra;
        this.image = IMGUrl + this.media.media_id + '.jpg';
    }
}
