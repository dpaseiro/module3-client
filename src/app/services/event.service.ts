import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment'

export class Event {

  _id: string;
  name: string;
  author: string;
  avatar: string;
  members: string[];
  description: string[];
  comments: string;
  gameTitle :string;
}

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  eventCreate(event) {
    return this.http.post(`${environment.apiBase}/event/create`, event, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);
  }

  event(event) {
    return this.http.post(`${environment.apiBase}/event`, event, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);
  }
  
  eventEdit(eventInfo: Event) {
    console.log("eventinfo from service", eventInfo)
    return this.http.post(`${environment.apiBase}/event/update`, eventInfo, {withCredentials:true})  
    .map(res => res.json())
    .catch(this.handleError);
  }

  eventDelete(eventInfo: Event) {
    console.log()
    return this.http.post(`${environment.apiBase}/event/delete`, eventInfo, {withCredentials:true})  
    .map(res => res.json())
    .catch(this.handleError);
  }

      // login(user) {
      //   return this.http.post(`${environment.apiBase}/login`, user, {withCredentials:true})
      //     .map(res => res.json())
      //     .catch(this.handleError);
      // }
    
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
}

