import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../../services/shelf.service';
import { Shelfs } from '../../models/shelf.model';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';
import { ShelfIconRenderComponent } from './icon/shelf-icon-render.component';
import { ShelfIconEditorComponent } from './icon/shelf-icon-editor.component';
import { MetaService } from 'src/app/services/meta.service';

@Component({
    selector: 'mmb-shelfs-settings',
    templateUrl: './shelfs-settings.component.html',
    styleUrls: ['./shelfs-settings.component.scss']
})

export class ShelfsSettingsComponent implements OnInit {

    source: LocalDataSource;

    data = [];

    settings = {
        actions: {
            position: 'right'
        },
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
                filter: false,
                width: '50px'
            },
            shelf: {
                title: 'Nom',
                filter: false
            },
            provider: {
                title: 'Fournisseur',
                filter: false,
                width: '250px',
                editor: {
                    type: 'list',
                    config: {
                        list: this.metaService.getProviders()
                    }
                },
                valuePrepareFunction: (value) => {
                    if (value === '' || value === 0) {
                        return value;
                    } else {
                        return this.metaService.getProviders().filter(function(item) { return +item.value === +value; })[0].title;
                    }
                }
            },
            icon: {
                title: 'Icon',
                type: 'custom',
                filter: false,
                width: '75px',
                editor: {
                    type: 'custom',
                    component: ShelfIconEditorComponent,
                },
                renderComponent: ShelfIconRenderComponent
            }
        }
    };

    constructor(private shelfs: ShelfService, private toastrService: NbToastrService, private metaService: MetaService) {
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
        const newData = event.newData;
        this.shelfs.addShelf(newData).then(data => {
            newData.id = data.shelf_id;
            newData.link = '/shelf/' + data.shelf_id;
            console.log('all ', this.shelfs.myShelfs);
            console.log('new ', newData);
            const settings = this.shelfs.myShelfs.pop();
            this.shelfs.myShelfs.push(newData);
            this.shelfs.myShelfs.push(settings);
            newData.shelf_id = data.shelf_id;
            this.toastrService.success(data.message, 'Success');
            event.confirm.resolve(event.newData);
        }).catch(err => {
            this.toastrService.success(err, 'error');
            event.confirm.reject();
        });
    }

    onSaveConfirm(event):void {
        const newData = event.newData;
        this.shelfs.updateShelf(newData).then(data => {
            newData.id = newData.shelf_id;
            for (const s in this.shelfs.myShelfs) {
                if (this.shelfs.myShelfs[s].id === newData.shelf_id) {
                    this.shelfs.myShelfs[s] = Object.assign({}, newData);
                }
            }
            this.toastrService.success(data.message, 'Success');
            event.confirm.resolve();
        }).catch(err => {
            this.toastrService.success(err, 'error');
            event.confirm.reject();
        });
    }

    onDeleteConfirm(event): void {
        const newData = event.data;
        this.shelfs.deleteShelf(newData).then(data => {
            for (const s in this.shelfs.myShelfs) {
                if (this.shelfs.myShelfs[s].id === newData.shelf_id) {
                    this.shelfs.myShelfs.splice(+s, 1);
                    break;
                }
            }
            console.log(this.shelfs.myShelfs);
            this.toastrService.success(data.message, 'Success');
            event.confirm.resolve();
        }).catch(err => {
            this.toastrService.success(err, 'error');
            event.confirm.reject();
        });
    }
}
