import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mmb-media-edit',
    templateUrl: './media-edit.component.html',
    styleUrls: ['./media-edit.component.scss']
})
export class MediaEditComponent implements OnInit {

    title: String = 'Kill Bill Vol.1';
    extra: String = 'Uma Thurman, Lucy Liu, Vivica A. Fox, Daryl Hannah';
    image: String = 'https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg';

    constructor() { }

    ngOnInit(): void { }
}
