import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import 'devextreme/ui/date_box';
import {formatDate} from '@angular/common';
import { ScreenService } from 'src/app/shared/services';
import { IfStmt } from '@angular/compiler';

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
    onValueChanged: (e: Object) => this.dDateChange(e)
  }

  constructor(private http: HttpClient, private screenService: ScreenService) {
    this.getData(this.dateBoxOptions.value);
  }

  getData(dDate : Date){
    this.http.get<DisDocsByExpeditor>(`http://10.10.0.29:9183/Crm/GetDisDocsByExpeditor.json?Ddate=${formatDate(dDate, "yyyy-MM-dd","en")}&Acc=null`).subscribe(result => {
      this.dataSource = result;
    });
  }

  dDateChange(e: any){
    this.getData(e.value);
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
