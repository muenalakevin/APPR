import { Router } from '@angular/router';
import { RolService } from '../../services/rol.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private RolService:RolService,
    private router:Router,) {
      
      this.router.navigate(['/auth/login']);
    }

  ngOnInit() {
     this.router.navigate(['/auth/login']);
  }
}
