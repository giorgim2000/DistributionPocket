import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/app/shared/services';
import { IConfirmPaymentResponse, IDebtInfo, IDebtInfoResponse } from 'src/app/shared/services/Dtos';

@Component({
  selector: 'app-collect-cash',
  templateUrl: './collect-cash.component.html',
  styleUrls: ['./collect-cash.component.scss']
})
export class CollectCashComponent implements OnInit {
  hidePay: boolean = true;
  loading: boolean = true;
  zeroErrorPopup: boolean = false;
  //btnDisabled: boolean = false;
  preseller: IDebtInfo | undefined;
  payAmount: any;
  popupVisible: boolean = false;
  question: string = '';
  data: IDebtInfo[] = [];
  Acc: string = '';
  constructor(private http: HttpClient,private route: ActivatedRoute, private authService: AuthService) {
    this.Acc = this.route.snapshot.paramMap.get('Acc') ?? '';
  }

  ngOnInit(): void {
    this.GetCashData();
  }

  GetCashData(){
    this.http.get<IDebtInfoResponse>(`http://10.10.0.85:82/Crm/GetDetsByAcc.json?acc=${this.Acc}`)
    .subscribe({
      next: (result) => {
        this.data = result.Result.filter(i => i.PresellerId > 0);
        this.data.map(i => i.DisplayString = i.PresellerName + '      ---      ' + i.Debt + '₾');
        this.loading = false;
    },
    error: (err) => {
      this.loading = false;
      if(err.status == 401){
        alert('სესიის ვადა ამოიწურა!');
        this.authService.logOut();
      }
      else
        alert("სერვისთან დაკავშირება ვერ ხერხდება! გთხოვთ შეამოწმოთ ინტერნეტთან წვდომა!");
    }});
  }

  presellerSelection(preseller : any){
    this.loading = true;
    if(preseller.value !== null){
      this.hidePay = false;
      this.preseller = this.data.find(i => i.PresellerId === preseller.value);
    }
    else
      this.hidePay = true;

    this.loading = false;
  }

  showPopup(){
    if(this.payAmount > 0){
      this.question = `გსურთ   ${this.payAmount}₾   ოდენობის გადახდა განახორციელოთ  პრესელერი - ${this.preseller?.PresellerName}   სახელით?`;
      this.popupVisible = true;
    }else{
      this.zeroErrorPopup = true;
    }
  }

  confirmPayment(){
    this.loading = true;
    this.http.post<IConfirmPaymentResponse>("http://10.10.0.85:82/crm/PayDetsByPreseller.json", 
            {Acc: this.Acc, PayAcc: localStorage.getItem('PayAcc'), PresellerId: this.preseller?.PresellerId, Amount: this.payAmount, OperId: localStorage.getItem('PayOperId'),
          Username: AuthService.userName})
            .subscribe({
              next: (result) => {
                if(result.Result !== null){
                  this.popupVisible = false;
                  this.GetCashData();
                  this.payAmount = null;
                  this.loading = false;
                  notify({message:
                    "გადახდა წარმატებით განხორციელდა!",
                    position: {
                      my: 'center bottom',
                      at: 'center bottom',
                    },
                  }, 'success', 2000);
                }
              },
              error: (err) => {
                this.loading = false;
                if(err.status == 401){
                  alert('სესიის ვადა ამოიწურა!');
                  this.authService.logOut();
                }
                else
                  alert("გადახდა ვერ განხორციელდა!");
              }
            })
  }

  // numBoxValueChange(e: any){
  //   if(e.value > 0)
  //     this.btnDisabled = false;
  //   else
  //     this.btnDisabled = true;
  // }

  // refreshDebt(event: any){
  //   console.log(event);
  // }

  closePopup(){
    this.popupVisible = false;
    this.zeroErrorPopup = false;
    this.question = '';
  }
}

