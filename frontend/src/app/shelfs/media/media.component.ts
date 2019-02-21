import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media.model';

@Component({
    selector: 'mmb-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

    @Input() media: Media;

    constructor() { }

    ngOnInit(): void { }
}
