import { Component, OnInit } from '@angular/core';
import { UserService, User} from '../../services/user.service';
// import { ProfileService} from '../../services/profile.service';
import { Router } from '@angular/router';
import { FormStyle } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileInfo = new User();

  theActualUser:any ={};

  errorMessage: string;

  shown:boolean = false

  constructor(   private user: UserService,
    private router: Router,
  ) {}

  toggleShow() {
    if(this.shown === false) {
      this.shown = true
    } else {
      this.shown = false
    }
  }

  editProfile(){
    // console.log(formInfo.values)
    console.log('------------------------------', this.profileInfo)

    // this.profileInfo._id = this.theActualUser._id
    this.user.profileEdit(this.profileInfo)
    .subscribe((response: User) => {
    this.checkIfLoggedIn();
    },
      err=>{
        this.errorCallBack(null)    // this.profileInfo._id = this.theActualUser._id

    })
  }

  successCallBack(userObject){
    this.theActualUser = userObject;
    this.errorMessage = '';
  }

  errorCallBack(errorObject){
    this.errorMessage = errorObject;
    this.theActualUser = {username: '', password: ''};
  }

  checkIfLoggedIn(){
    this.user.isLoggedIn()
    .subscribe(
      res=> {
        console.log(res)
        this.successCallBack(res)},
      err=> {this.errorCallBack(null)}
    )
  }
  
  ngOnInit() {
    this.checkIfLoggedIn();
  }

}
