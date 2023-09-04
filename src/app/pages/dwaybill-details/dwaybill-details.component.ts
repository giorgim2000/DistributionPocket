import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { IWaybillDetails, Resp, VisitDetails } from 'src/app/shared/services/Dtos';

@Component({
  selector: 'app-dwaybill-details',
  templateUrl: './dwaybill-details.component.html',
  styleUrls: ['./dwaybill-details.component.scss']
})
export class DwaybillDetailsComponent implements OnInit {
  Data: IWaybillDetails[] = [];
  popupVisible: boolean = false;
  loading: boolean = false;
  info = {} as VisitDetails;
  Account: string | null = '';
  type: string | null = '';
  docsId: string | null = '';
  status = 0;
  question: string = 'გსურთ შეკვეთის დადასტურება?';
  btnText: string = 'დადასტურება';
  Ddate: string = '';
  waybillNum: string = '';
  orderId: string = '';
  btnType: string = 'success';
  msg: string = 'შეკვეთა წარმატებით დადასტურდა!';
  comment: string = '';

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.info = history.state.info;
    this.Account = this.route.snapshot.paramMap.get('Acc');
    this.Ddate = this.route.snapshot.paramMap.get('Ddate') ?? '';
    this.type = this.route.snapshot.paramMap.get('type');
    this.docsId = this.route.snapshot.paramMap.get('id');
    if(this.info.Ostatus === "დადასტურებული"){
      this.question = 'გსურთ შეკვეთის სტატუსის დაწევა?';
      this.btnText = 'დაწევა';
      this.status = 0;
      this.btnType = 'danger';
      this.msg = 'შეკვეთის სტატუსმა წარმატებით დაიწია!';
    }
    if(!this.info.Ostatus || this.info.Ostatus === "პროექტი")
      this.status = 1;
      
  }

  ngAfterViewInit() {
    this.getProductData();
  }

  confirmBtnClick(){
    this.popupVisible = true;
  }

  getProductData(){
    this.loading = true;
    this.http.get<Resp>(`http://10.10.0.85:82/Crm/GetCustomerDocsProducts.json?DocsId=${this.docsId}`)
    .subscribe({
      next: (result) => {
        this.waybillNum = result.Result[0].Waybillnum;
        this.orderId = result.Result[0].OrderId;
        for (let index = 0; index < result.Result.length; index++) {
          this.Data.push(result.Result[index]);
        }
        this.loading = false;
    },
    error: (err) => {
      console.log(err);
      console.log(" getcustomerdocsproducts error");
      //console.log(err);
      // this.router.navigate(["/login-form"]);
    }});
  }

  changeStatus(){
    this.loading = true;
    this.http.post(`http://10.10.0.85:82/Crm/ChangeExpVisitItemStatus.json`, {VisitDetails: {Docs_id: this.info.Docs_ID, Order_id: this.Data[0].OrderId, 
    Status: this.status, Note: this.comment, Ddate: new Date(this.Ddate), Crtime: new Date()}}).subscribe({
      next: res => {
        notify({message:
          this.msg,
          position: {
            my: 'center bottom',
            at: 'center bottom',
          },
        }, 'success', 2000);
        this.loading = false;
        this.router.navigate([`/visits/${this.Ddate}/${this.Account}/${this.type}`]);
      },
      error: err => {
        const message = `დაფიქსირდა შეცდომა! ${err}`;
        notify({
          message,
          position: {
            my: 'center bottom',
            at: 'center bottom',
          },
        }, 'error', 2000);
      }
    });
    
  }

  closePopup(){
    this.popupVisible = false;
  }

}





//   Bcode: string;
//   ProductName: string;
//   Amount: Number;
// }

// export interface IDwaybillDetails{
//   waybillNumber: string;
//   OrderNumber: string;
//   ProductList: IProduct[];
// }

// const that = this;
    // this.emailButtonOptions = {
    //   type: 'success',
    //   stylingMode: 'contained',
    //   text: 'დადასტურება',
    //   onClick() {
    //     const message = `Email is sent to ${that.currentEmployee.FirstName} ${that.currentEmployee.LastName}`;
    //     notify({
    //       message,
    //       position: {
    //         my: 'center top',
    //         at: 'center top',
    //       },
    //     }, 'success', 3000);
    //   },
    // };
    // this.closeButtonOptions = {
    //   type: 'normal',
    //   stylingMode: 'text',
    //   text: 'დახურვა',
    //   onClick() {
    //     that.popupVisible = false;
    //   }
    // };

