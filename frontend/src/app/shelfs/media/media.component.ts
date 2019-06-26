import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../models/media.model';
import { MediaEditComponent } from './media-edit/media-edit.component';
import { NbDialogService } from '@nebular/theme';

@Component({
    selector: 'mmb-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

    @Input() media: Media;

    constructor(private dialogService: NbDialogService) { }

    ngOnInit(): void { }

    editMe() {
        const hasBackdrop: Boolean = true;
        // const dialogRef = this.dialogService.open(MediaEditComponent, { context: 
        //     this.media
        //   ,}).onClose.subscribe(action => {
        //         console.log('close');
        //     });
    }
}
