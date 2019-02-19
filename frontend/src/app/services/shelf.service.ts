import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Shelf, Shelfs } from '../models/shelf.model';

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

  getOneShelf(shelf_id: number): Observable<Shelf> {
    const href = APIUrl + '/shelf/' + shelf_id;
    const requestUrl = `${href}`;
    return this.http.get<Shelf>(requestUrl);
  }

  addShelf(shelf: Shelf): Promise<any> {
    const href = APIUrl + '/shelf';
    const requestUrl = `${href}`;
    return this.http.post(requestUrl, shelf).toPromise();
  }

  updateShelf(shelf: Shelf): Promise<any> {
    const href = APIUrl + '/shelf/' + shelf.shelf_id;
    const requestUrl = `${href}`;
    delete shelf.shelf_id;
    return this.http.put(requestUrl, shelf).toPromise();
  }

  deleteShelf(shelf: Shelf): Promise<any> {
    const href = APIUrl + '/shelf/' + shelf.shelf_id;
    const requestUrl = `${href}`;
    return this.http.delete(requestUrl).toPromise();
  }

}
