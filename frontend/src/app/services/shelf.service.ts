import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Shelfs } from '../models/shelf.model';

const APIUrl = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private http: HttpClient) {}

  getShelfs(): Observable<Shelfs> {
    const href = APIUrl + '/shelf';
    const requestUrl = `${href}`;
    return this.http.get<Shelfs>(requestUrl);
  }
}
