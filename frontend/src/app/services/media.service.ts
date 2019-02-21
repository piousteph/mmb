import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Media, Medias } from '../models/media.model';

const APIUrl = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {}

  getMedias(shelf_id: number): Observable<Medias> {
    const href = APIUrl + '/media/' + shelf_id;
    const requestUrl = `${href}`;
    return this.http.get<Medias>(requestUrl);
  }

  getOneMedia(shelf_id: number, media_id: number): Observable<Media> {
    const href = APIUrl + '/media/' + shelf_id + '/' + media_id;
    const requestUrl = `${href}`;
    return this.http.get<Media>(requestUrl);
  }

  addMedia(shelf_id: number, media: Media): Promise<any> {
    const href = APIUrl + '/media/' + shelf_id;
    const requestUrl = `${href}`;
    return this.http.post(requestUrl, media).toPromise();
  }

  updateMedia(shelf_id: number, media: Media): Promise<any> {
    const href = APIUrl + '/shelf/' + shelf_id + '/' + media.item_id;
    const requestUrl = `${href}`;
    delete media.item_id;
    return this.http.put(requestUrl, media).toPromise();
  }

  deleteMedia(shelf_id: number, media: Media): Promise<any> {
    const href = APIUrl + '/shelf/' + shelf_id + '/' + media.item_id;
    const requestUrl = `${href}`;
    return this.http.delete(requestUrl).toPromise();
  }
}
