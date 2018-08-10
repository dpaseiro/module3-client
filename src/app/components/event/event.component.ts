import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventInfo = {
    name: "",
    author: "",
    location: "",
    rsvp: "",
    comments: "",
    date: "",
    description: "",
    gameTitle: ""
  }

  constructor() { }

  ngOnInit() {
  }

}
