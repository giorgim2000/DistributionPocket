import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  
  constructor(private router: Router) {

  }

  getVisits(){
    this.router.navigate(["/tasks"]);
  }
}


