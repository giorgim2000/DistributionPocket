import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  dummyData: IOrder[]=[
    {
      InvoiceNumber: "21312325",
      Preseller: "ნოდარ ავალიშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },{
      InvoiceNumber: "67585856",
      Preseller: "ვასილ მაისურაძე",
      Remark: "ეს არის შენიშვნა...ეს არის შენიშვნა...",
      Status: false,
      Comment: "არ მიიღო ფასის გამო..."
    },
    {
      InvoiceNumber: "6231677",
      Preseller: "რამაზ აბდუ",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "კომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარი"
    },
    {
      InvoiceNumber: "316772323",
      Preseller: "ვასილი უტკინ",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },
    {
      InvoiceNumber: "512536777",
      Preseller: "მიხეილ სააკაშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "არავითარი პირობითი სასჯელი!"
    },
    {
      InvoiceNumber: "666111222",
      Preseller: "ლევან ხაბეიშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: ""
    },
    {
      InvoiceNumber: "21312325",
      Preseller: "კობა ხაბაზი",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    }
  ]

  constructor() { }

  ngOnInit(): void {
    
  }

  orderClick(order: any){

  }

}

export interface IOrder{
  InvoiceNumber: string;
  Preseller: string;
  Remark: string;
  Status: boolean;
  Comment: string;
}