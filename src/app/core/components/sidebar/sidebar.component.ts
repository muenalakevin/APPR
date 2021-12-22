import { Component, OnInit } from '@angular/core';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';
import {   } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userTagIcon = faUserTag
  constructor() { }

  ngOnInit() {
  }

}
