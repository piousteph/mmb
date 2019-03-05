import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ShelfIconSelectorComponent } from './shelf-icon-selector.component';

@Component({
  template: `
    <i class="m-icon {{ iconName }}" (click)="openSelector()"></i>
  `,
  styles: [`:host .m-icon { font-size: 24px; cursor: pointer; }`]
})
export class ShelfIconEditorComponent extends DefaultEditor implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('url') url: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;

  iconName: string;

  icon: string;

  constructor(private dialogService: NbDialogService) {
    super();
  }

//  ngAfterViewInit() {
  ngOnInit() {
    if (this.cell.newValue !== '') {
      this.iconName = this.cell.newValue;
    //   this.name.nativeElement.value = this.getIconName();
    } else {
      this.iconName = 'eva eva-question-mark-circle-outline';
    }
  }

  openSelector() {
    this.dialogService.open(ShelfIconSelectorComponent)
      .onClose.subscribe(icon => {
        if (icon !== undefined) {
          this.iconName = icon;
          this.cell.newValue = icon;
        }
      });
  }
}
