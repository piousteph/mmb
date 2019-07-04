import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media.model';
import { MediaEditComponent } from './media-edit/media-edit.component';
import { NbDialogService } from '@nebular/theme';
import { environment } from 'src/environments/environment.prod';

const IMGUrl = environment.IMGUrl;

@Component({
    selector: 'mmb-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

    @Input() media: Media;

    constructor(private dialogService: NbDialogService) { }

    defaultImage = 'https://www.placecage.com/1000/1000';
    image = '';

    ngOnInit(): void {
        this.image = IMGUrl + this.media.media_id + '.jpg';
    }

    editMe() {
        const dialogRef = this.dialogService.open(MediaEditComponent, {
            context: {
                media: this.media
            }
        }).onClose.subscribe(action => {
            console.log('close');
        });
    }
}
