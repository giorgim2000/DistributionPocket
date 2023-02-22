import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  MenuItems = [
    {
      text: "ვიზიტები",
      type: "default",
      buttonStyle: "contained",
      onClick: () => this.getVisits()
    },
    {
      text: "სალაროს ამონაწერი",
      type: "default",
      buttonStyle: "contained",
      onClick: () => this.getCashiersDocs()
    },
    {
      text: "პრობლემური საბუთები",
      type: "danger",
      buttonStyle: "outlined",
      onClick: () => this.getProblematicDocs()
    }
  ]

  constructor(private router: Router) {

  }

  getVisits(){
    this.router.navigate(["/tasks"]);
  }

  getCashiersDocs(){
    //this.router.navigate(["/profile"]);
  }

  getProblematicDocs(){
    //this.router.navigate(["./tasks"]);
  }
}


