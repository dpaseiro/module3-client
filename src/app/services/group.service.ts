import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment'


export class Group {

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
export class GroupService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  groupSearch(searchEntered){
    // console.log('searrrrrrrchServce', searchEntered)
    return this.http.post(`${environment.apiBase}/group/search`, {search:searchEntered}, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);  }

  groupCreate(group) {
    console.log("info from the group when creating group on service side %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ", group)
    return this.http.post(`${environment.apiBase}/group/create`, group, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);
  }

  group(group) {
    console.log("info from params on service side",group);
    return this.http.get(`${environment.apiBase}/group/${group}`, {withCredentials:true})
    .map(res => res.json())
    .catch(this.handleError);
  }
  
  groupEdit(groupInfo: Group) {
    console.log("groupinfo from service", groupInfo)
    return this.http.post(`${environment.apiBase}/group/update`, groupInfo, {withCredentials:true})  
    .map(res => res.json())
    .catch(this.handleError);
  }

  groupDelete(groupInfo: Group) {
    console.log()
    return this.http.post(`${environment.apiBase}/group/delete`, groupInfo, {withCredentials:true})  
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
      deleteGroup(id){
        console.log('id in service: ', id)
        return this.http.post(`${environment.apiBase}/group/${id}/delete`,{},
        { withCredentials: true })
        .toPromise()
      }

// display the comments in group
      groupComments(commentsEntered){
        console.log('COOOOOOOOOOmmmmmentsSSS', commentsEntered)
        return this.http.post(`${environment.apiBase}/group`, commentsEntered, {withCredentials:true})
        .map(res => res.json())
        .catch(this.handleError);  }

// create a group comment
        commentCreate(groupInfo: Group) {
          return this.http.post(`${environment.apiBase}/group/${this.groupInfo.comments}`, groupInfo, {withCredentials:true})  
            .map(res => res.json())
            .catch(this.handleError);

        }

}

