import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { shelfIconsList } from '../../models/shelf.model';

@Component({
  template: `
    <button nbButton status="primary" (click)="open()">Enter Name</button>
  `,
})
export class ShelfIconEditorComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('url') url: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.getIconName();
    }
  }

  updateValue() {
    const href = this.url.nativeElement.value;
    const name = this.name.nativeElement.value;
    this.cell.newValue = `<a href='${href}'>${name}</a>`;
  }

  getIconName(): string {
    return this.htmlValue.nativeElement.innerText;
  }
}
