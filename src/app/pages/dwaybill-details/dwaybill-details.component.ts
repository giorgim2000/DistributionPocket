import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dwaybill-details',
  templateUrl: './dwaybill-details.component.html',
  styleUrls: ['./dwaybill-details.component.scss']
})
export class DwaybillDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}

export interface IDwaybillDetails{
  DwaybillNumber: string;
  OrderNumber: string;
  Bcode: string;
  ProductName: string;
  Amount: string;
}