import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collect-cash',
  templateUrl: './collect-cash.component.html',
  styleUrls: ['./collect-cash.component.scss']
})
export class CollectCashComponent implements OnInit {

  dummyData: any = [
    {
      name: "Nodari",
      id: 511
    },
    {
      name: "Vasiko",
      id: 69
    },
    {
      name: "Fur2xia",
      id: 1
    },
    {
      name: "Chusti Jr",
      id: 12
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.GetCashData();
  }

  GetCashData(){
    console.log("Get Cash Data!");
  }

}
