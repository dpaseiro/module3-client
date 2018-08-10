import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupInfo = {
    username: "",
    password: "",
    email: ""
  };

  theActualUser:any ={};

  errorMessage: string;

  constructor(
    private user: UserService,
    private router: Router
  ) { }

  goHome() {
    this.router.navigate(['/']);
  }
  
  signup(){
    console.log(this.signupInfo)
    this.user.signup(this.signupInfo)
    .subscribe((response)=>{
      this.router.navigate(['/login'])
    });
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
      res=> {this.successCallBack(res)},
      err=> {this.errorCallBack(null)}
    )
  }
  
  ngOnInit() {
    this.checkIfLoggedIn();
  }


}
