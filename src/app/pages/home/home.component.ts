import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
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
  

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void{
    
  }

  getVisits(){
    this.router.navigate(["/visits"]);
  }

  getCashiersDocs(){
    this.router.navigate(["/balance"]);
  }

  getProblematicDocs(){
    this.router.navigate(["./problemTasks"]);
  }
}


