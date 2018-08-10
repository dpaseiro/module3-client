import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private group: GroupService,
    private router:Router
  ) { }

  searchInfo:any = '';

  searchedGroup:any = {}

  ngOnInit() {
  }

  search(){
    console.log('------', this.searchInfo)
    this.group.groupSearch(this.searchInfo)
    .subscribe((theGroup)=>{
      this.router.navigate([`/group/${theGroup._id}`])
    })
  }

}
