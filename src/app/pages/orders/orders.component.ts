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
      Preseller: "რამაზ აბდუ",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "კომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარიკომენტარი, კომენტარი, კომენტარი"
    },
    {
      DwaybillNumber: "316772323",
      Preseller: "ვასილი უტკინ",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },
    {
      DwaybillNumber: "512536777",
      Preseller: "მიხეილ სააკაშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "არავითარი პირობითი სასჯელი!"
    },
    {
      DwaybillNumber: "666111222",
      Preseller: "ლევან ხაბეიშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: ""
    },
    {
      DwaybillNumber: "21312325",
      Preseller: "კობა ხაბაზი",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
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