import { Component, NgModule } from "@angular/core";

@Component({
    selector: 'visits-tab',
    templateUrl:'./visits-tab.component.html',
    styleUrls: ['./visits-tab.component.scss']
})

export class VisitsTabComponent{

}

@NgModule({
    declarations: [ VisitsTabComponent ],
    exports: [ VisitsTabComponent ]
  })
  export class VisitsTabModule { }