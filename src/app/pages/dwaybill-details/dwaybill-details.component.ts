import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dwaybill-details',
  templateUrl: './dwaybill-details.component.html',
  styleUrls: ['./dwaybill-details.component.scss']
})
export class DwaybillDetailsComponent implements OnInit {
  DummyData: IDwaybillDetails = 
    {
      DwaybillNumber: "299919992",
      OrderNumber: "211116969",
      ProductList: [
        {
          Bcode: "111122231566",
          ProductName: "სიგარეტი",
          Amount: 130
        },
        {
          Bcode: "61388823366",
          ProductName: "სანთებელა",
          Amount: 51
        },
        {
          Bcode: "78908909009",
          ProductName: "კოკა-კოლა",
          Amount: 30
        },
        {
          Bcode: "1123111411",
          ProductName: "ფანტა",
          Amount: 60
        },
        {
          Bcode: "25136666712",
          ProductName: "სპრაიტი",
          Amount: 20
        },
        {
          Bcode: "51266661",
          ProductName: "ლეისი",
          Amount: 150
        }
      ]
    }
  ;


  constructor() { }

  ngOnInit(): void {
  }



}

export interface IProduct{
  Bcode: string;
  ProductName: string;
  Amount: Number;
}

export interface IDwaybillDetails{
  DwaybillNumber: string;
  OrderNumber: string;
  ProductList: IProduct[];
}

