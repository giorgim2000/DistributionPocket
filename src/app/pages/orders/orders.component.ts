import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  dummyData: IOrder[]=[
    {
      DwaybillNumber: "21312325",
      Preseller: "ნოდარ ავალიშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },{
      DwaybillNumber: "67585856",
      Preseller: "ვასილ მაისურაძე",
      Remark: "ეს არის შენიშვნა...ეს არის შენიშვნა...",
      Status: false,
      Comment: "არ მიიღო ფასის გამო..."
    },
    {
      DwaybillNumber: "6231677",
      Preseller: "ვასილ მაისურაძე",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "კომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარი"
    },
    {
      DwaybillNumber: "316772323",
      Preseller: "ბორის გოგოჭური",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },
    {
      DwaybillNumber: "512536777",
      Preseller: "რუსლან ხმალაძე",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "საქონელი იყო დაზიანებული"
    },
    {
      DwaybillNumber: "666111222",
      Preseller: "ბორის გოგოჭური",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "არ მიიღო ფასის გამო..."
    },
    {
      DwaybillNumber: "21312325",
      Preseller: "რუსლან ხმალაძე",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "არ მიიღო ფასის გამო..."
    }
  ]
  completedUrl: string = "../../../assets/completed.png";
  pendingUrl: string = "../../../assets/pending.png";

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  orderClick(order: any){
    this.router.navigate(["/dwaybillDetails"]);
  }

}

export interface IOrder{
  DwaybillNumber: string;
  Preseller: string;
  Remark: string;
  Status: boolean;
  Comment: string;
}