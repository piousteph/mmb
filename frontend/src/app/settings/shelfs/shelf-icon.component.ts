import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { shelfIconsList } from '../../models/shelf.model';

@Component({
    template: `<i class="menu-icon {{ iconName }}"></i>`,
    styles: [`:host .menu-icon { font-size: 1.5rem; }`]
})

export class ShelfIconComponent implements OnInit, ViewCell {
    iconName: string;

    @Input() value: string | number;
    @Input() rowData: any;

    constructor() { }

    ngOnInit() {
        if (this.value !== '') {
            const newValue = this.value;
            const i = shelfIconsList.filter(function(item) { return item.value === newValue; });
            this.iconName = i[0].value;
        } else {
            this.iconName = 'eva eva-question-mark-circle-outline';
        }
    }
}
