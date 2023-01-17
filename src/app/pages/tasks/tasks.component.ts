import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import {formatDate} from '@angular/common';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  dataSource: any;
  dDate: Date = new Date();

  constructor(private http: HttpClient) {
    http.get(`http://10.10.0.29:9183/Crm/GetDisDocsByExpeditor.json?Ddate=${formatDate(this.dDate, 'yyyy/MM/dd', 'en')}&Acc=null`).subscribe(result => {
      this.dataSource = result;
    });
  }
}
