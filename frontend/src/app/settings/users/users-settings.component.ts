import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user.model';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';
import { MetaService } from 'src/app/services/meta.service';

@Component({
    selector: 'mmb-users-settings',
    templateUrl: './users-settings.component.html',
    styleUrls: ['./users-settings.component.scss']
})

export class UsersSettingsComponent implements OnInit {

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
            user_id: {
                title: 'ID',
                editable: false,
                addable: false,
                filter: false,
                width: '50px'
            },
            user: {
                title: 'Nom',
                filter: false
            },
            email: {
                title: 'Email',
                filter: false
            },
            id_profile: {
                title: 'Profile',
                filter: false,
                width: '150px',
                editor: {
                    type: 'list',
                    config: {
                        list: this.metaService.getProfiles()
                    }
                },
                valuePrepareFunction: (value) => {
                    if (value === '') {
                        return value;
                    } else {
                        return this.metaService.getProfiles().filter(function(item) { return +item.value === +value; })[0].title;
                    }
                }
            }
        }
    };

    constructor(private users: UserService, private toastrService: NbToastrService, private metaService: MetaService) {
        this.source = new LocalDataSource();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.users.getUsers().subscribe((users: Users) => {
            this.data = [];
            users.rows.forEach(user => {
                this.data.push(user);
            });
            this.source.load(this.data);
        });
    }

    onCreateConfirm(event):void {
        this.users.addUser(event.newData).then(data => {
            event.newData.user_id = data.user_id;
            this.toastrService.success(data.message, 'Success');
            event.confirm.resolve(event.newData);
        }).catch(err => {
            this.toastrService.success(err, 'error');
            event.confirm.reject();
        });
    }

    onSaveConfirm(event):void {
        this.users.updateUser(event.newData).then(data => {
            this.toastrService.success(data.message, 'Success');
            event.confirm.resolve();
        }).catch(err => {
            this.toastrService.success(err, 'error');
            event.confirm.reject();
        });
    }

    onDeleteConfirm(event): void {
        this.users.deleteUser(event.data).then(data => {
            this.toastrService.success(data.message, 'Success');
            event.confirm.resolve();
        }).catch(err => {
            this.toastrService.success(err, 'error');
            event.confirm.reject();
        });
    }
}
