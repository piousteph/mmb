import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users, User } from '../models/user.model';

const APIUrl = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users> {
    const href = APIUrl + '/user';
    const requestUrl = `${href}`;
    return this.http.get<Users>(requestUrl);
  }

  getOneUser(user_id: number): Observable<User> {
    const href = APIUrl + '/user/' + user_id;
    const requestUrl = `${href}`;
    return this.http.get<User>(requestUrl);
  }

  addUser(user: User): Promise<any> {
    const href = APIUrl + '/user';
    const requestUrl = `${href}`;
    return this.http.post(requestUrl, user).toPromise();
  }

  updateUser(user: User): Promise<any> {
    const href = APIUrl + '/user/' + user.user_id;
    const requestUrl = `${href}`;
    delete user.user_id;
    return this.http.put(requestUrl, user).toPromise();
  }

  deleteUser(user: User): Promise<any> {
    const href = APIUrl + '/user/' + user.user_id;
    const requestUrl = `${href}`;
    return this.http.delete(requestUrl).toPromise();
  }
}
