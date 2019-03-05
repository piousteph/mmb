import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const APIUrl = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private _profiles = [];
  private _providers = [];
  private _initialized = false;

  constructor(private http: HttpClient) { }

  initMeta(): void {
    const href = APIUrl + '/meta';
    const requestUrl = `${href}`;
    this.http.get<any>(requestUrl).toPromise().then(data => {
      this._profiles = data.profiles;
      this._providers = data.providers;
      this._initialized = true;
    });
  }

  getProfiles() {
    return this._profiles;
  }

  getProviders() {
    return this._providers;
  }

  isInitialized() {
    return this._initialized;
  }
}
