import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

// COMPONENTS
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

// SERVICES

// ROUTES
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupComponent } from './components/group/group.component';
import { EventComponent } from './components/event/event.component';
import { EventService } from './services/event.service';
import { GroupService } from './services/group.service';
import { UserService } from './services/user.service';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const routes: Routes = [

  {
    path: "",
    component: SignupComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
  path: "profile/update",
  component: ProfileComponent
  },
  {
    path: "group/:id",
    component: GroupComponent
  },
  {
    path: "new-group",
    component: NewGroupComponent
  },
  {
    path: "event",
    component: EventComponent
  },
  {
    path: "new-event",
    component: NewEventComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    GroupComponent,
    EventComponent,
    NewGroupComponent,
    NewEventComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EventService, GroupService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
