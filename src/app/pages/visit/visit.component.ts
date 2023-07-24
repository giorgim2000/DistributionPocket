import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisDocByExpeditor, DisDocByExpeditorResponse, IFinishExpeditorVisitResponse } from '../../shared/services/Dtos';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {
  visitData: DisDocByExpeditor | null = null;
  VisitAcc: any;
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

  constructor(private router: Router, private route: ActivatedRoute, private client: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.VisitAcc = params.get('Acc');
      this.Ddate = params.get('Ddate') ?? '';
    });
    this.getData();
    this.openVisit();
  }

  getData(){
    return this.client.get<DisDocByExpeditorResponse>(`http://localhost:82/Crm/GetDisDocsByExpeditor.json?Ddate=${formatDate(this.Ddate, "yyyy-MM-dd","en")}&Acc=${this.VisitAcc}`)
    .subscribe({
      next: (result) => {
        this.visitData = result.Result[0];
        if(this.visitData.VisitStatus > 1){
          this.ordersBtnDisabled = true;
          this.returnsBtnDisabled = true;
          this.payBtnDisabled = true;
          // POPUP ROMELIC GVEUBNEBA ROM VISITI DASRULEBULIA AN PROBLEMURIA    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! da loadIndicator!!!!!!
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
    },
      error: (err) => {
        //handle error !!!!!!!!!!!!!!!!!
    }});
  }

  openVisit(){
    this.client.post<any>(`http://localhost:82/Crm/AddExpeditorVisit.json`, {Ddate: this.Ddate, Acc: this.VisitAcc})
    .subscribe(res => {
      this.visitId = res.Result;
    });
  }

  orders(){
    if(this.visitData != undefined)
      this.router.navigate([`visits/${this.Ddate}/${this.visitData.Acc}/orders/0`],  { state: { VisitInfo: this.visitData} });
  }

  returns(){
    if(this.visitData != undefined)
      this.router.navigate([`visits/${this.Ddate}/${this.visitData.Acc}/orders/1`],  { state: { VisitInfo: this.visitData } });
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
    var visitStatusId = null;
    if(endVisit){
      visitStatusId = this.checkVisitStatus();
    }
    this.client.post<IFinishExpeditorVisitResponse>(`http://localhost:82/Crm/FinishExpVisits/${this.visitId}`, {Comment: this.comment, VisitStatus: visitStatusId})
        .subscribe({next: (res) => {
          if(res.Result){
            // NOTIFY!!!!!!
          }else{
            //NOTIFY!!!!!!
          }
          this.getData();
          this.popupVisible = false;
        },
        error: (err) => {
          console.log(err); //`~!!!!!!!!!!!!!!!!!
        }
      });
  }

  closePopup(): void{
    this.popupVisible = false;
  }

  checkVisitStatus(): number{
    if(this.visitData?.Ordn === this.visitData?.Ordsuccess && this.visitData?.Retn === this.visitData?.Retsuccess){
      return 2;
    }else
      return 3;
  }

  reOpenVisit(): void{
    this.client.post<IFinishExpeditorVisitResponse>(`http://localhost:82/Crm/FinishExpVisits/${this.visitId}`, {Comment: null, VisitStatus: 1})
        .subscribe({next: (res) => {
          if(res.Result){
            // NOTIFY!!!!!!
          }else{
            //NOTIFY!!!!!!
          }
          this.getData();
          this.reOpenPopupVisible = false;
        },
        error: (err) => {
          console.log(err); //`~!!!!!!!!!!!!!!!!!
        }
      });
  }

  closeRePopup(){
    this.reOpenPopupVisible = false;
  }
}

