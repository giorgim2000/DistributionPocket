import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { timeout } from 'rxjs';
import { VisitsTabComponent } from 'src/app/shared/components/visits-tab/visits-tab.component';




@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  
  constructor(private router: Router) {

  }

  getVisits(){
    console.log("nodari");
    this.router.navigate(["/tasks"]);
  }
}

// @NgModule({
//   imports: [
//     RouterModule
//   ]
// })
// export class HomeComponentModule{

// }
