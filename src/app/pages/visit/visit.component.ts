import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisDocByExpeditor, DisDocByExpeditorResponse, IFinishExpeditorVisitResponse } from '../../shared/services/Dtos';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/shared/services';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {
  visitData: DisDocByExpeditor | null = null;
  VisitAcc: any;
  loading: boolean = true;
  headerString: string = "";
  Ddate: string = '';
  ordersBtnDisabled: boolean = false;
  returnsBtnDisabled: boolean = false;
  payBtnDisabled: boolean = false;
  visitId: any;
  popupVisible: boolean = false;
  finishVisit: boolean = false;
  comment: string = '';
  btnString: string = 'ვიზიტის დასრულება';
  btnType: string = 'default';
  reOpenPopupVisible: boolean = false;
  questionText: string = '';
  finishMsg: string = '';
  notifyType: string = 'success';

  constructor(private router: Router, private route: ActivatedRoute, private client: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.VisitAcc = params.get('Acc');
      this.Ddate = params.get('Ddate') ?? '';
    });
    this.getData();
    this.openVisit();
  }

  getData(){
    this.loading = true;
    return this.client.get<DisDocByExpeditorResponse>(`http://10.10.0.85:82/Crm/GetDisDocsByExpeditor.json?Ddate=${formatDate(this.Ddate, "yyyy-MM-dd","en")}&Acc=${this.VisitAcc}`)
    .subscribe({
      next: (result) => {
        if(result.Result.length > 0){
          this.visitData = result.Result[0];
          if(this.visitData.VisitStatus > 1){
            this.ordersBtnDisabled = true;
            this.returnsBtnDisabled = true;
            this.payBtnDisabled = true;
            this.btnString = 'ვიზიტის გახსნა';
            this.btnType = 'success';
          }else{
            if(this.visitData.Ordn === 0)
              this.ordersBtnDisabled = true;
            else
            this.ordersBtnDisabled = false;
      
            if(this.visitData.Retn === 0)
              this.returnsBtnDisabled = true;
            else
              this.returnsBtnDisabled = false;

            this.payBtnDisabled = false;
          }
          this.headerString = this.visitData.Accnu;
        }else{
          alert('ვიზიტის შესახებ ინფორმაცია ვერ მოიძებნა!');
        }
        
        this.loading = false;
    },
      error: (err) => {
        this.loading = false;
        if(err.status == 401){
          alert('სესიის ვადა ამოიწურა!');
          this.authService.logOut();
        }
        else
          alert('დაფიქსირდა შეცდომა!');
    }});
  }

  openVisit(){
    this.loading = true;
    this.client.post<any>(`http://10.10.0.85:82/Crm/AddExpeditorVisit.json`, {Ddate: this.Ddate, Acc: this.VisitAcc})
    .subscribe({next: res => {
      this.visitId = res.Result;
      this.loading = false;
    },
    error: err => {
      this.loading = false;
      if(err.status == 401){
        alert('სესიის ვადა ამოიწურა!');
        this.authService.logOut();
      }
      else
        alert('დაფიქსირდა შეცდომა!');
    }
  });
  }

  orders(){
    if(this.visitData != undefined)
      this.router.navigate([`visits/${this.Ddate}/${this.visitData.Acc}/0`],  { state: { VisitInfo: this.visitData} });
  }

  returns(){
    if(this.visitData != undefined)
      this.router.navigate([`visits/${this.Ddate}/${this.visitData.Acc}/1`],  { state: { VisitInfo: this.visitData } });
  }

  collect(){
    if(this.visitData != undefined)
      this.router.navigate([`visits/${this.Ddate}/${this.visitData.Acc}/collect-cash`],  { state: { VisitInfo: this.visitData, } });
  }

  showPopup(finishVisit: boolean){
    if(this.visitData?.VisitStatus !== 1){
      this.reOpenPopupVisible = true;
    }else{
      this.finishVisit = finishVisit;
      if(finishVisit)
        this.questionText = 'გსურთ ვიზიტის დასრულება?';
      else
        this.questionText = '';
      this.popupVisible = true;
    }
  }

  visitAction(endVisit: boolean){
    this.loading = true;
    var visitStatusId = null;
    if(endVisit){
      visitStatusId = this.checkVisitStatus();
    }
    this.client.post<IFinishExpeditorVisitResponse>(`http://10.10.0.85:82/Crm/FinishExpVisits/${this.visitId}`, {Comment: this.comment, VisitStatus: visitStatusId})
        .subscribe({next: (res) => {
          notify({message:
            this.finishMsg,
            position: {
              my: 'center bottom',
              at: 'center bottom',
            },
          }, this.notifyType, 2000);
          this.getData();
          this.popupVisible = false;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          if(err.status == 401){
            alert('სესიის ვადა ამოიწურა!');
            this.authService.logOut();
          }
          else
            alert('დაფიქსირდა შეცდომა!');
          }
      });
  }

  closePopup(): void{
    this.comment = '';
    this.popupVisible = false;
  }

  checkVisitStatus(): number{
    if(this.visitData?.Ordn === this.visitData?.Ordsuccess && this.visitData?.Retn === this.visitData?.Retsuccess){
      this.finishMsg = 'ვიზიტი წარმატებით დასრულდა!';
      this.notifyType = 'success';
      return 2;
    }else
      this.finishMsg = 'ვიზიტის წარმატებით დასრულება ვერ მოხერხდა!';
      this.notifyType = 'warning';
      return 3;
  }

  reOpenVisit(): void{
    this.loading = true;
    this.finishMsg = 'ვიზიტის გახსნა წარმატებით განხორციელდა!';
    this.notifyType = 'success';
    this.client.post<IFinishExpeditorVisitResponse>(`http://10.10.0.85:82/Crm/FinishExpVisits/${this.visitId}`, {Comment: null, VisitStatus: 1})
        .subscribe({next: (res) => {
          notify({message:
            this.finishMsg,
            position: {
              my: 'center bottom',
              at: 'center bottom',
            },
          }, this.notifyType, 2000);
          this.getData();
          this.reOpenPopupVisible = false;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          if(err.status == 401){
            alert('სესიის ვადა ამოიწურა!');
            this.authService.logOut();
          }
          else
            notify({message:
              'დაფიქსირდა შეცდომა!',
              position: {
                my: 'center bottom',
                at: 'center bottom',
              },
            }, 'warning', 2000);
          }
      });
  }

  closeRePopup(){
    this.reOpenPopupVisible = false;
  }
}

