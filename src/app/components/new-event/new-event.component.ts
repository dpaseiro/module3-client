import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  eventInfo = {
    name: "",
    author: "",
    avatar: "",
    description: "",
    location: "",
    date: "",
    rsvp: "",
    gameTitle: "",
    comments: ""
  };

  theActualEvent: any = {};
  theActualUser: any = {};

  errorMessage: String;
  
  constructor(
    private event: EventService,
    private user: UserService,
    private router: Router
  ) { }

  goHome() {
    this.router.navigate(['/']);
  }
  
  eventCreate(){
    console.log(this.eventInfo)
    this.event.eventCreate(this.eventInfo)
    .subscribe((response)=>{
      this.router.navigate(['/event'])
    });
  }

  successCallBack(userObject){
    this.theActualUser = userObject;
    this.errorMessage = '';
  }

  errorCallBack(errorObject){
    this.errorMessage = errorObject;
    this.theActualEvent = {username: '', password: ''};
  }

  checkIfLoggedIn(){
    this.user.isLoggedIn()
    .subscribe(
      res=> {this.successCallBack(res)},
      err=> {this.errorCallBack(null)}
    )
  }
  
  ngOnInit() {
    this.checkIfLoggedIn();
  }

}
