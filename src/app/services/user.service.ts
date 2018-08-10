import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment'


export class User {

  _id: string;
  username: string;
  password: string;
  location: string;
  groups: string[];
  events: string[];
  avatar: string;
  bio: string;
  comments :string;
  topGames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${environment.apiBase}/signup`, user, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);
  }


  login(user) {
    return this.http.post(`${environment.apiBase}/login`, user, {withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${environment.apiBase}/logout`, {}, {withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${environment.apiBase}/loggedin`, {withCredentials:true})
      .map(res => { 
        return JSON.parse((<any>res)._body) 
      })
      .catch(this.handleError);
  }

  profile(user) {
    return this.http.post(`${environment.apiBase}/profile`, user, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);
  }
  
  profileEdit(userInfo: User) {
    console.log("userinfo from service", userInfo)
    return this.http.post(`${environment.apiBase}/profile/update`, userInfo, {withCredentials:true})  
      .map(res => res.json())
      .catch(this.handleError);
      // .toPromise()
      // .subscribe(
      //   (data) => console.log(data),
      //   (err) => this.handleError = err
      // )
  }
}