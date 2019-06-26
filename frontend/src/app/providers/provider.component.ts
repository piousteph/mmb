import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const APIUrl = environment.APIUrl;

@Component({
    selector: 'mmb-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss']
})
export class ProvidersComponent implements OnInit {

    input = '';
    results = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void { }

    goSearch(event) {
        const href = APIUrl + '/provider/1?title=' + this.input;
        const requestUrl = `${href}`;
        this.http.get<any>(requestUrl).toPromise().then(data => {
            this.results = [];
            data.data.forEach(element => {
                this.results.push({
                    title: element.title
                });
            });
        });
    }
}
