import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo = {
    username: "",
    password: "",
  };

  theActualUser:any ={};

  errorMessage: string;

  constructor(
    private user: UserService,
    private router: Router
  ) { }
  
  login(){
    console.log(this.loginInfo)
    this.user.login(this.loginInfo)
    .subscribe((response)=>{
      this.router.navigate(['/profile'])
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
