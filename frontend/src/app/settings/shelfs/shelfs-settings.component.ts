import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../../services/shelf.service';
import { Shelfs } from '../../models/shelf.model';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';

@Component({
    selector: 'mmb-shelfs-settings',
    templateUrl: './shelfs-settings.component.html',
    styleUrls: ['./shelfs-settings.component.scss']
})

export class ShelfsSettingsComponent implements OnInit {

    source: LocalDataSource;

    data = [];

    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true
        },
        columns: {
            shelf_id: {
                title: 'ID',
                editable: false,
                addable: false,
                filter: false
            },
            shelf: {
                title: 'Nom',
                filter: false
            }
        }
    };

    constructor(private shelfs: ShelfService, private toastrService: NbToastrService) {
        this.source = new LocalDataSource();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.shelfs.getShelfs().subscribe((shelfs: Shelfs) => {
            this.data = [];
            shelfs.rows.forEach(shelf => {
                this.data.push(shelf);
            });
            this.source.load(this.data);
        });
    }

    onCreateConfirm(event):void {
        this.shelfs.addShelf(event.newData).then(data => {
            event.newData.shelf_id = data.shelf_id;
            this.toastrService.success(data.message, 'Success')
            event.confirm.resolve(event.newData);
        }).catch(err => {
            this.toastrService.success(err, 'error')
            event.confirm.reject();
        });
    }

    onSaveConfirm(event):void {
        this.shelfs.updateShelf(event.newData).then(data => {
            this.toastrService.success(data.message, 'Success')
            event.confirm.resolve();
        }).catch(err => {
            this.toastrService.success(err, 'error')
            event.confirm.reject();
        });
    }

    onDeleteConfirm(event): void {
        this.shelfs.deleteShelf(event.data).then(data => {
            this.toastrService.success(data.message, 'Success')
            event.confirm.resolve();
        }).catch(err => {
            this.toastrService.success(err, 'error')
            event.confirm.reject();
        });
    }
}
