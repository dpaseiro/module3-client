import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupInfo = {
    name: "",
    author: "",
    avatar: "",
    members: "",
    description: "",
    gameTitle: "",
    comments: ""
  };

  theActualGroup:any = {};
  theActualUser: any = {};

shown: boolean = false;

shownComment: boolean = false;


  errorMessage: String;
  
  constructor(
    private group: GroupService,
    private user: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  goHome() {
    this.router.navigate(['/']);
  }
  
  showComment() {
    if(this.shownComment === false) {
      this.shownComment = true
    } else {
      this.shownComment = false
    }
  }

  toggleShow() {
    if(this.shown === false) {
      this.shown = true
    } else {
      this.shown = false
    }
  }

  // group(){
  //   console.log(this.groupInfo)
  //   this.group.group(this.groupInfo)
  //   .subscribe((response)=>{
  //     this.router.navigate(['/group'])
  //   });
  // }

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

  // theGroup() {
  //   console.log(">>>>> group info being retrieved <<<<<", this.activeRoute.params['value'].group)
  //   this.group.group(this.activeRoute.params['value'].id)
  //   .subscribe((groupResults) => {
  //     this.theActualGroup = groupResults;
  //     console.log("group info ============ ", groupResults);
  //   },
  //   err=>{console.log("nooooo")}
  //   )
  // }  

  deleteThisGroup(){
    console.log('id in the group: ', this.theActualGroup._id)
    if (!confirm("Are you sure?")) {
      return;
    }
    this.group
      .deleteGroup(this.theActualGroup._id)
      .then(() => {
        console.log("Success");
        this.router.navigate(["/"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Phone Delete Error");
        console.log(err);
      });
  }

getGroup(groupId){
  console.log(groupId)
  this.group.group(groupId)
  .subscribe((singleGroup)=>{
    console.log(singleGroup)
    this.theActualGroup = singleGroup
    console.log("group info after load ---------------------- ", this.theActualGroup)
  })
}

groupCreate(){
  console.log("this is the group info before we create the group ==================== ", this.groupInfo)
  this.group.groupCreate(this.groupInfo)
  .subscribe((response)=>{
  console.log('blah:',response)
    this.router.navigate(['/group', response._id])
  });
}

// commentCreate(){
//   console.log('------', this.groupInfo.comments)
//   this.group.group(this.groupInfo.comments)
//   .subscribe((theGroup)=>{
//     console.log("1111111111111", theGroup)
//     this.router.navigate([`/group/${theGroup._id}`])
//   })
// }

createComment(){
  console.log('------------------------------', this.groupInfo)
  this.group.commentCreate.push(this.groupInfo)
  .subscribe((response) => {
    console.log(this.theActualGroup)
  this.checkIfLoggedIn();
  console.log(response)
  },
    err=>{
      this.errorCallBack(null)    // this.profileInfo._id = this.theActualUser._id

  })
}
// groupCreate(){
//   console.log("this is the group info before we create the group ==================== ", this.groupInfo)
//   this.group.groupCreate(this.groupInfo)
//   .subscribe((response)=>{
//   console.log('blah:',response)
//     this.router.navigate(['/group', response._id])
//   });
// }

  
  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{
      this.getGroup(params["id"])
      this.checkIfLoggedIn();
    })
  }
  
}
