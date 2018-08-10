import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  gamesArray = [
    {gameTitle: 'Pota'},
    {gameTitle: '200% Snake'},
    {gameTitle: 'Kitty Klicker'},
    {gameTitle: 'Space Dogfight'},
    {gameTitle: 'George vs. Arepa'},
    {gameTitle: 'TactClicks'},
    {gameTitle: 'SAGEOM'},
    {gameTitle: 'KanyeSnake'},
    {gameTitle: 'MazeOrc'},
    {gameTitle: 'Rhythm & Time'},
    {gameTitle: 'Humans vs. Orcs'},
    {gameTitle: 'Country Cow'},
    {gameTitle: 'Alien Invasion'},
    {gameTitle: 'Ping Pong'},
    {gameTitle: 'Star Wars Doodle Jump'},
    {gameTitle: 'Secure the Henny'}
  ]

  selectValue = null;

  groupInfo = {
    name: "",
    avatar: "",
    author: "",
    members: "",
    description: "",
    gameTitle: "",
    comments: ""
  };

  theActualGroup: any = {};
  theActualUser: any = {};

  errorMessage: String;
  
  constructor(
    private group: GroupService,
    private user: UserService,
    private router: Router
  ) { }

  goHome() {
    this.router.navigate(['/']);
  }
  
  groupCreate(){
    console.log("this is the group info before we create the group ==================== ", this.groupInfo)
    this.group.groupCreate(this.groupInfo)
    .subscribe((response)=>{
    console.log('blah:',response)
      this.router.navigate(['/group', response._id])
    });
  }

  successCallBack(userObject){
    this.theActualUser = userObject;
    this.errorMessage = '';
  }

  errorCallBack(errorObject){
    this.errorMessage = errorObject;
    this.theActualGroup = {username: '', password: ''};
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
