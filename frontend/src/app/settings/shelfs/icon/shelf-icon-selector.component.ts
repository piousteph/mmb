import { Component, OnInit } from '@angular/core';
import { shelfIconsList } from '../../../models/shelf.model';
import { NbDialogRef } from '@nebular/theme';


@Component({
    templateUrl: './shelf-icon-selector.component.html',
    styleUrls: ['./shelf-icon-selector.component.scss']
})
export class ShelfIconSelectorComponent implements OnInit {

    icons = shelfIconsList;

    constructor(protected dialogRef: NbDialogRef<ShelfIconSelectorComponent>) { }

    ngOnInit(): void { }

    selectMe(icon: string) {
        this.dialogRef.close(icon);
    }
}
