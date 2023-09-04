import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatepickerComponent } from 'src/app/shared/components';
import { AuthService, ITransaction, ITransactionResponse } from 'src/app/shared/services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  loading: boolean = false;
  dateStart: any = new Date();
  dateEnd: any = new Date();
  balanceStart: number = 0;
  balanceEnd: number = 0;
  data: ITransaction[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData(this.dateStart, this.dateEnd);
  }

  dateValueChanged(event: any){
    if(event.element.id === 'start' && event.value > this.dateEnd)
      this.dateEnd =  event.value;

    if(event.element.id === 'end' && event.value < this.dateStart)
      this.dateStart = event.value;

    
    this.getData(this.dateStart, this.dateEnd);
  }

  getData(start : Date, end : Date){
    this.loading = true;
    this.http.get<ITransactionResponse>(`http://10.10.0.85:82/crm/GetExpeditorTransactionInfo.json?D1=${formatDate(start, "yyyy-MM-dd","en")}&D2=${formatDate(end, "yyyy-MM-dd","en")}&Acc=${localStorage.getItem('PayAcc')}`)
              .subscribe({
                next: (res) => {
                  this.data = res.Result.filter(i => i.BookId);
                  this.balanceStart = res.Result.find(t => t.StartVg)?.StartVg ?? 0;
                  this.balanceEnd = res.Result.find(t => t.EndVg)?.EndVg ?? 0;
                  this.formatDate(this.data);
                  this.loading = false;
                },
                error: (err) => {
                  console.log(err);
                  this.loading = false;
                }
              })
  }

  formatDate(arr: ITransaction[]){
    arr.forEach(i => {
      const match = i.DDate.toString().match(/\/Date\((\d+)(-\d+)?\)\/$/);
      if (match) {
        const timestamp = parseInt(match[1], 10);
        i.DDate = new Date(timestamp);
        
        i.DateString = formatDate(i.DDate, "MMM/dd","en");
      }
    })
  }

  tabClick(){
    return;
  }
}

