import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class JameelServiceProxy {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:16873/users';

  addUser(user: User) {
    return this.http.post<User>(this.rootURL + '/add', {firstName:user.firstName, lastName:user.lastName,dateOfBirth:user.dateOfBirth,phoneNumber:user.phoneNumber,address:user.address});
  }

}