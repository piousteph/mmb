import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user.model';

@Component({
    selector: 'mmb-users-settings',
    templateUrl: './users-settings.component.html',
    styleUrls: ['./users-settings.component.scss']
})

export class UsersSettingsComponent implements OnInit {

    data = [];
    resultsLength = 0;

    constructor(private users: UserService) { }

    ngOnInit() {
        console.log('Users Settings');
        this.loadData();
    }

    loadData() {
        this.users.getUsers().subscribe((users: Users) => {
            this.data = [];
            console.log(users)
            users.rows.forEach(user => {
                console.log(user)
            })
        });
    }
}
