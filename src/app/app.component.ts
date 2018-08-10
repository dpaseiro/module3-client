import { Component } from '@angular/core';
import {UserService} from '../app/services/user.service';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  signUpUser:any = {};
  theActualUser:any = {};
  loginUser:any = {};
  theError: any;

  constructor(private userService: UserService) { }

  // tryToSignUp(){

  //   this.userService.signup(this.signUpUser)
  //   .subscribe(
  //     userObjFromApi =>{ this.successCallback(userObjFromApi)},
  //     errorThing=>{this.errorCallback(errorThing)}
  //   );
  // }

  tryToLogIn(){
  this.userService.login(this.loginUser)
  .subscribe(
    res=>{this.successCallback(res)},
    err=>{this.errorCallback(err)}
  );
  }

  logMeOut(){
    this.userService.logout()
    .subscribe(res=>{ this.theActualUser={} })
  }

successCallback(userObject){
this.theActualUser = userObject;
this.theError = '';
}

errorCallback(errorObject){
  this.theError = errorObject;
  this.theActualUser= {username: '', password:''};
}

ngOnInit() {
  }

}
