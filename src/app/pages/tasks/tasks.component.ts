import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  dataSource: any;
  //priority: any[];

  constructor(private http: HttpClient) {
    http.get(`http://10.10.0.29:9183/Crm/GetDisDocsByExpeditor.json?Ddate=2022-10-17&Acc=null`).subscribe(result => {
      this.dataSource = result;
    });
  }
}
