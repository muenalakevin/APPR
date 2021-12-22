import { Component, Input, OnInit } from '@angular/core';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-iconNavbar',
  templateUrl: './iconNavbar.component.html',
  styleUrls: ['./iconNavbar.component.css']
})
export class IconNavbarComponent implements OnInit {
  @Input() icon = faQuestionCircle;
  @Input() text:string = 'Text';
  @Input() href:string = '';
  @Input() disabled_:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
