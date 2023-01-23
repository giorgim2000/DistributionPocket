import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import 'devextreme/ui/date_box';
import {formatDate} from '@angular/common';
import { ScreenService } from 'src/app/shared/services';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  dataSource: any;
  //dDate: Date = new Date();   //2022, 10, 17
  dateBoxOptions = {
    value :new Date(),
    acceptCustomValue: false,
    displayFormat: "dd-MM-yyyy",
    dateSerializationFormat:"yyyy-MM-dd",
    openOnFieldClick: true,
    stylingMode:"outlined",
    label: "თარიღი",
    width: 180,
    //onValueChanged: (e: any) => this.getData(e.value)
  }

  dummyData : DisDocsByExpeditor[] = [
    {
      Acc: "1221455",
      Accnu: "შპს თორნიკე ოჩკარიკი",
      Address: "თბილისი, ვაზის უბანი N38",
      Ordn: 7,
      Ordsuccess: 6,
      Retsuccess: 5,
      Retn: 5,
      Collectpay: 1200,
      Paydcash: 50
    },
    {
      Acc: "5912033",
      Accnu: "შპს ნოდარი",
      Address: "თბილისი, პეკინის ქუჩა N35",
      Ordn: 5,
      Ordsuccess: 2,
      Retsuccess: 1,
      Retn: 3,
      Collectpay: 400,
      Paydcash: 150
    },
    {
      Acc: "12315551",
      Accnu: "შპს ოდელია",
      Address: "თბილისი, დელი დელა N69",
      Ordn: 15,
      Ordsuccess: 8,
      Retsuccess: 3,
      Retn: 9,
      Collectpay: 1552,
      Paydcash: 799
    }
  ]

  constructor(private http: HttpClient, private screenService: ScreenService, private router: Router) {
    this.getData();
    //this.getData(this.dateBoxOptions.value);
  }

  // getData(dDate : Date){
  //   this.http.get<DisDocsByExpeditor>(`http://10.10.0.29:9183/Crm/GetDisDocsByExpeditor.json?Ddate=${formatDate(dDate, "yyyy-MM-dd","en")}`).subscribe(result => {
  //     this.dataSource = result;
  //   });
  // }

  visitClick(e : any){
    console.log(e);
    this.router.navigate(["/home"]);
  }

  getData(){
    this.dataSource = this.dummyData.map(v => ({
      Accnu: v.Accnu,
      Address: v.Address,
      Orders: v.Ordsuccess + '/' + v.Ordn,
      Returns: v.Retsuccess + '/' + v.Retn,
      Cash: v.Paydcash,
      CollectedPay: v.Collectpay
    }))
  }
}

interface DisDocsByExpeditor{
  Acc : string;
  Accnu : string;
  Address : string;
  Ordsuccess : number;
  Ordn : number;
  Retsuccess : number;
  Retn : number;
  Collectpay : number;
  Paydcash : number;
}
