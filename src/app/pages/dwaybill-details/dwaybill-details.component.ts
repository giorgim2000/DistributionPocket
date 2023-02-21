import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-dwaybill-details',
  templateUrl: './dwaybill-details.component.html',
  styleUrls: ['./dwaybill-details.component.scss']
})
export class DwaybillDetailsComponent implements OnInit {
  DummyData: IDwaybillDetails = 
    {
      DwaybillNumber: "299919992",
      OrderNumber: "211116969",
      ProductList: [
        {
          Bcode: "111122231566",
          ProductName: "სიგარეტი",
          Amount: 130
        },
        {
          Bcode: "61388823366",
          ProductName: "სანთებელა",
          Amount: 51
        },
        {
          Bcode: "78908909009",
          ProductName: "კოკა-კოლა",
          Amount: 30
        },
        {
          Bcode: "1123111411",
          ProductName: "ფანტა",
          Amount: 60
        },
        {
          Bcode: "25136666712",
          ProductName: "სპრაიტი",
          Amount: 20
        },
        {
          Bcode: "51266661",
          ProductName: "ლეისი",
          Amount: 150
        },
        {
          Bcode: "78908909009",
          ProductName: "კოკა-კოლა",
          Amount: 30
        },
        {
          Bcode: "1123111411",
          ProductName: "ფანტა",
          Amount: 60
        },
        {
          Bcode: "25136666712",
          ProductName: "სპრაიტი",
          Amount: 20
        },
        {
          Bcode: "51266661",
          ProductName: "ლეისი",
          Amount: 150
        },
        {
          Bcode: "78908909009",
          ProductName: "კოკა-კოლა",
          Amount: 30
        },
        {
          Bcode: "1123111411",
          ProductName: "ფანტა",
          Amount: 60
        },
        {
          Bcode: "25136666712",
          ProductName: "სპრაიტი",
          Amount: 20
        },
        {
          Bcode: "51266661",
          ProductName: "ლეისი",
          Amount: 150
        },
        {
          Bcode: "78908909009",
          ProductName: "კოკა-კოლა",
          Amount: 30
        },
        {
          Bcode: "1123111411",
          ProductName: "ფანტა",
          Amount: 60
        },
        {
          Bcode: "25136666712",
          ProductName: "სპრაიტი",
          Amount: 20
        },
        {
          Bcode: "51266661",
          ProductName: "ლეისი",
          Amount: 150
        }
      ]
    }
  ;
  popupVisible: boolean = false;
  employees: any = [];
  currentEmployee: any = {};
  moreInfoButtonOptions: any;

  emailButtonOptions: any;

  closeButtonOptions: any;


  constructor(private router: Router) {
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
   }

  ngOnInit(): void {
  }

  confirmBtnClick(){
    this.popupVisible = true;
  }

  confirmOrder(){
    this.router.navigate(["/tasks"]);
    const message = `შეკვეთა წარმატებით დადასტურდა!`;
        notify({
          message,
          position: {
            my: 'center top',
            at: 'center top',
          },
        }, 'success', 3000);
  }


  closePopup(){
    this.popupVisible = false;
  }
}

export interface IProduct{
  Bcode: string;
  ProductName: string;
  Amount: Number;
}

export interface IDwaybillDetails{
  DwaybillNumber: string;
  OrderNumber: string;
  ProductList: IProduct[];
}

