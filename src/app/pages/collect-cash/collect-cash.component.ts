import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { IConfirmPaymentResponse, IDebtInfo, IDebtInfoResponse } from 'src/app/shared/services/Dtos';

@Component({
  selector: 'app-collect-cash',
  templateUrl: './collect-cash.component.html',
  styleUrls: ['./collect-cash.component.scss']
})
export class CollectCashComponent implements OnInit {
  hidePay: boolean = true;
  btnDisabled: boolean = true;
  preseller: IDebtInfo | undefined;
  payAmount: number = 0;
  popupVisible: boolean = false;
  question: string = '';
  data: IDebtInfo[]=[];
  Acc: string = '';
  constructor(private http: HttpClient,private route: ActivatedRoute) {
    this.Acc = this.route.snapshot.paramMap.get('Acc') ?? '';
  }

  ngOnInit(): void {
    this.GetCashData();
  }

  GetCashData(){
    this.http.get<IDebtInfoResponse>(`http://localhost:82/Crm/GetDetsByAcc.json?acc=${this.Acc}`)
    .subscribe({
      next: (result) => {
        this.data = result.Result.filter(i => i.PresellerId > 0);
        this.data.map(i => i.DisplayString = i.PresellerName + '      ---      ' + i.Debt);
    },
    error: (err) => {
      alert("Somehting went wrong!");
    }});
  }

  presellerSelection(preseller : any){
    if(preseller.value !== null){
      this.hidePay = false;
      this.preseller = this.data.find(i => i.PresellerId === preseller.value);
    }
    else
      this.hidePay = true;
  }

  showPopup(){
    this.question = `გსურთ   ${this.payAmount}₾   ოდენობის გადახდა განახორციელოთ  პრესელერი - ${this.preseller?.PresellerName}   სახელით?`;
    this.popupVisible = true;
  }

  confirmPayment(){
    this.http.post<IConfirmPaymentResponse>("http://localhost:82/crm/PayDetsByPreseller.json", 
            {Acc: this.Acc, PayAcc: localStorage.getItem('PayAcc'), PresellerId: this.preseller?.PresellerId, Amount: this.payAmount, OperId: localStorage.getItem('PayOperId')})
            .subscribe({
              next: (result) => {
                if(result.Result !== null){
                  this.popupVisible = false;
                  this.GetCashData();
                  this.payAmount = 0;
                  notify({message:
                    "გადახდა წარმატებით განხორციელდა!",
                    position: {
                      my: 'center bottom',
                      at: 'center bottom',
                    },
                  }, 'success', 1500);
                }
                
              },
              error: (err) => {
                alert("გადახდა ვერ განხორციელდა!");
              }
            })
  }

  numBoxValueChange(e: any){
    console.log(e);
    if(e.value > 0)
      this.btnDisabled = false;
    else
      this.btnDisabled = true;
  }

  refreshDebt(event: any){
    console.log(event);
  }

  closePopup(){
    this.popupVisible = false;
    this.question = '';
  }
}

