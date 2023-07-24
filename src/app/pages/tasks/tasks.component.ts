import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';
import 'devextreme/ui/date_box';
import {formatDate} from '@angular/common';
import { AuthService, DisDocByExpeditor, DisDocByExpeditorResponse, ScreenService } from 'src/app/shared/services';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['./tasks.component.scss','tasks.component.scss']
})

export class TasksComponent implements OnInit {
  dataSource: DisDocByExpeditor[] = [];
  FilteredData: DisDocByExpeditor[] = [];
  visitDate: string = new Date("2022-10-17").toString(); //new Date().toString();
  
  private _filter : string ='';

  get filter(): string{
    return this._filter;
  }
  set filter(value: string){
    this._filter = value;
    this.FilteredData = this.performFilter(value);
  }

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {  }

  ngOnInit(): void {
    this.getData(new Date());
  }

  getData(dDate : Date){
    return this.http.get<DisDocByExpeditorResponse>(`http://localhost:82/Crm/GetDisDocsByExpeditor.json?Ddate=${formatDate(dDate, "yyyy-MM-dd","en")}`)
    .subscribe({
      next: (result) => {
        this.dataSource = result.Result;
        this.FilteredData = this.performFilter(this.filter);
    },
    error: (err) => {
      this.authService.logOut();
    }});
  }

  visitClick(visit: DisDocByExpeditor){
    this.router.navigate([`visits/${formatDate(this.visitDate,"yyyy-MM-dd","en")}/${visit.Acc}`], { state: { data: visit } });
  }

  filterValueChanged(e: any){
    this.filter = e.value;
  }

  performFilter(filterBy: string): DisDocByExpeditor[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.dataSource.filter((doc: DisDocByExpeditor) => doc.Accnu.toLocaleLowerCase().includes(filterBy));
  }

  dateChange(e: any){
    this.getData(e.value);
  }

  onDrop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.FilteredData, event.previousIndex, event.currentIndex);
  }

}




//dDate: Date = new Date();   //2022, 10, 17
  // dateBoxOptions = {
  //   value :new Date(),
  //   acceptCustomValue: false,
  //   displayFormat: "dd-MM-yyyy",
  //   dateSerializationFormat:"yyyy-MM-dd",
  //   openOnFieldClick: true,
  //   stylingMode:"outlined",
  //   label: "თარიღი",
  //   width: 180,
  //   //onValueChanged: (e: any) => this.getData(e.value)
  // }

  
  // dummyData : DisDocsByExpeditor[] = [
  //   {
  //     Acc: "1221455",
  //     Accnu: "შპს თორნიკე ოჩკარიკი",
  //     Address: "თბილისი, ვაზის უბანი N38",
  //     Ordn: 7,
  //     Ordsuccess: 6,
  //     Retsuccess: 5,
  //     Retn: 5,
  //     Collectpay: 1200,
  //     Payedcash: 50
  //   },
  //   {
  //     Acc: "5912033",
  //     Accnu: "შპს ნოდარი",
  //     Address: "თბილისი, პეკინის ქუჩა N35",
  //     Ordn: 5,
  //     Ordsuccess: 2,
  //     Retsuccess: 1,
  //     Retn: 3,
  //     Collectpay: 400,
  //     Payedcash: 150
  //   },
  //   {
  //     Acc: "12315551",
  //     Accnu: "შპს ოდელია",
  //     Address: "თბილისი, დელი დელა N69",
  //     Ordn: 15,
  //     Ordsuccess: 8,
  //     Retsuccess: 3,
  //     Retn: 9,
  //     Collectpay: 1552,
  //     Payedcash: 799
  //   }
  // ]

  // getData(){
  //   this.dataSource = this.dummyData.map(v => ({
  //     Accnu: v.Accnu,
  //     Address: v.Address,
  //     Orders: v.Ordsuccess + '/' + v.Ordn,
  //     Returns: v.Retsuccess + '/' + v.Retn,
  //     Cash: v.Paydcash,
  //     CollectedPay: v.Collectpay
  //   }))
  // }