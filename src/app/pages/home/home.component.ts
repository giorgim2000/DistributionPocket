import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';



@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  
  constructor(private router: Router) {
    timeout(5000);
    this.getVisits();
  }

  getVisits(){
    this.router.navigateByUrl("/home");
  }
}

