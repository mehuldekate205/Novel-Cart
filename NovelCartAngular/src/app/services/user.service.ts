import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { usercred, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl;

  Userregisteration(_data: User) {
    return this.http.post(this.baseUrl + 'User/RegisterUser', _data);
  }

  Proceedlogin(_data: usercred) {
    return this.http.post(this.baseUrl + 'Login?Username=' + _data.username + '&Password=' + _data.password, null);
  }
}
