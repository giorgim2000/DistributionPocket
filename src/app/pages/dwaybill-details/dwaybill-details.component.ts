import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-dwaybill-details',
  templateUrl: './dwaybill-details.component.html',
  styleUrls: ['./dwaybill-details.component.scss']
})
export class DwaybillDetailsComponent implements OnInit {
  Data: IWaybillDetails[] = [];
  popupVisible: boolean = false;

  employees: any = []; // ??????????????????????????
  currentEmployee: any = {}; // ???????????????????????
  moreInfoButtonOptions: any; // ??????????????????????

  emailButtonOptions: any; // ??????????????????

  closeButtonOptions: any; // ???????????????????


  constructor(private router: Router, private http: HttpClient) {
    this.http.get<Resp>(`http://localhost:82/Crm/GetCustomerDocsProducts.json?DocsId=${history.state.info.Docs_ID}`)
    .subscribe({
      next: (result) => {
        for (let index = 0; index < result.Result.length; index++) {
          this.Data.push(result.Result[index]);
        }
    },
    error: (err) => {
      alert();
      console.log(err);
      // this.router.navigate(["/login-form"]);
    }});
   }

  ngOnInit(): void {
  }

  confirmBtnClick(){
    this.popupVisible = true;
  }

  confirmOrder(){
    const message = `შეკვეთა წარმატებით დადასტურდა!`;
        notify({
          message,
          position: {
            my: 'center top',
            at: 'center top',
          },
        }, 'success', 1300);

    this.router.navigate(["/tasks"]);
  }

  closePopup(){
    this.popupVisible = false;
  }

}

export interface IWaybillDetails{
  OrderId:string;
  Bcode:string;
  Products_nu:string;
  Scount:number;
  Waybillnum:string;
}

export interface Resp{
  Result: IWaybillDetails[];
}








// export interface IProduct{
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

// DummyData: IDwaybillDetails = 
//     {
//       waybillNumber: "299919992",
//       OrderNumber: "211116969",
//       ProductList: [
//         {
//           Bcode: "111122231566",
//           ProductName: "სიგარეტი",
//           Amount: 130
//         },
//         {
//           Bcode: "61388823366",
//           ProductName: "სანთებელა",
//           Amount: 51
//         },
//         {
//           Bcode: "78908909009",
//           ProductName: "კოკა-კოლა",
//           Amount: 30
//         },
//         {
//           Bcode: "1123111411",
//           ProductName: "ფანტა",
//           Amount: 60
//         },
//         {
//           Bcode: "25136666712",
//           ProductName: "სპრაიტი",
//           Amount: 20
//         },
//         {
//           Bcode: "51266661",
//           ProductName: "ლეისი",
//           Amount: 150
//         },
//         {
//           Bcode: "78908909009",
//           ProductName: "კოკა-კოლა",
//           Amount: 30
//         },
//         {
//           Bcode: "1123111411",
//           ProductName: "ფანტა",
//           Amount: 60
//         },
//         {
//           Bcode: "25136666712",
//           ProductName: "სპრაიტი",
//           Amount: 20
//         },
//         {
//           Bcode: "51266661",
//           ProductName: "ლეისი",
//           Amount: 150
//         },
//         {
//           Bcode: "78908909009",
//           ProductName: "კოკა-კოლა",
//           Amount: 30
//         },
//         {
//           Bcode: "1123111411",
//           ProductName: "ფანტა",
//           Amount: 60
//         },
//         {
//           Bcode: "25136666712",
//           ProductName: "სპრაიტი",
//           Amount: 20
//         },
//         {
//           Bcode: "51266661",
//           ProductName: "ლეისი",
//           Amount: 150
//         },
//         {
//           Bcode: "78908909009",
//           ProductName: "კოკა-კოლა",
//           Amount: 30
//         },
//         {
//           Bcode: "1123111411",
//           ProductName: "ფანტა",
//           Amount: 60
//         },
//         {
//           Bcode: "25136666712",
//           ProductName: "სპრაიტი",
//           Amount: 20
//         },
//         {
//           Bcode: "51266661",
//           ProductName: "ლეისი",
//           Amount: 150
//         }
//       ]
//     }
//   ;