import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user.model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'mmb-users-settings',
    templateUrl: './users-settings.component.html',
    styleUrls: ['./users-settings.component.scss']
})

export class UsersSettingsComponent implements OnInit {

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
            id: {
                title: 'ID',
                editable: false,
                addable: false,
                filter: false
            },
            user: {
                title: 'Nom',
                filter: false
            },
            email: {
                title: 'Email',
                filter: false
            },
            profile: {
                title: 'Profile',
                filter: false,
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            { value: '1', title: 'Administrateur' }, 
                            { value: '2', title: 'Utilisateur' }
                        ]
                    }
                }
            }
        }
    };

    constructor(private users: UserService) {
        this.source = new LocalDataSource();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.users.getUsers().subscribe((users: Users) => {
            console.log(users);
            this.data = [];
            users.rows.forEach(user => {
                this.data.push(user);
            });
            console.log(this.data)
            this.source.load(this.data);
        });
    }

    onCreateConfirm(event):void {
        console.log('add', event);
    } 
    
    onSaveConfirm(event):void {
        console.log('save', event);
        this.users.updateUser(event.newData).then(data => {
            event.confirm.resolve();
        }).catch(err => {
            event.confirm.reject();
        })
    }
    
    onDeleteConfirm(event): void {
        console.log('delete', event);
    }
}

