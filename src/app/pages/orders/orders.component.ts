import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  dummyData: IOrder[]=[
    {
      DwaybillNumber: "21312325",
      Preseller: "ნოდარ ავალიშვილი",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },{
      DwaybillNumber: "67585856",
      Preseller: "ვასილ მაისურაძე",
      Remark: "ეს არის შენიშვნა...ეს არის შენიშვნა...",
      Status: false,
      Comment: "არ მიიღო ფასის გამო..."
    },
    {
      DwaybillNumber: "6231677",
      Preseller: "ვასილ მაისურაძე",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "კომენტარი, კომენტარი, კომენტარი, კომენტარი კომენტარი, კომენტარი, კომენტარი, კომენტარი კომენტარი, კომენტარი, კომენტარი, კომენტარი კომენტარი, კომენტარი, კომენტარი, კომენტარი კომენტარი, კომენტარი, კომენტარი, კომენტარი"
    },
    {
      DwaybillNumber: "316772323",
      Preseller: "ბორის გოგოჭური",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "საქონელი იყო დაზიანებული"
    },
    {
      DwaybillNumber: "512536777",
      Preseller: "რუსლან ხმალაძე",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "საქონელი იყო დაზიანებული"
    },
    {
      DwaybillNumber: "666111222",
      Preseller: "ბორის გოგოჭური",
      Remark: "ეს არის შენიშვნა...",
      Status: true,
      Comment: "არ მიიღო ფასის გამო..."
    },
    {
      DwaybillNumber: "21312325",
      Preseller: "რუსლან ხმალაძე",
      Remark: "ეს არის შენიშვნა...",
      Status: false,
      Comment: "არ მიიღო ფასის გამო..."
    }
  ]
  completedUrl: string = "../../../assets/completed.png";
  pendingUrl: string = "../../../assets/pending.png";
  pageType : string = "";
  tabClassName: string = "";
  visitData: any = {};
  sorting: boolean = false;
  btnType: string = "default";
  btnStyle: string = "contained";
  btnText: string = "სორტირება";
  orderSortObject: object = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.pageType = history.state.pageType;
    this.tabClassName = history.state.className;
    this.visitData = history.state.data;
    if(localStorage.getItem("orderSort") != null){
      //this.changeArrayIndex(this.dummyData, localStorage.getItem("orderSort"))
      console.log(localStorage.getItem("orderSort"));
    }
    // let copyArray: any[] = [];
    // if(localStorage.length > 0){
    //   for (let i = localStorage.length; i >= 0; i--) {
    //     // copyArray.push(this.dummyData.find(i => i.DwaybillNumber == localStorage.getItem(i)?.toString()))
    //     //copyArray.push({index: i, DwaybillNumber: localStorage.getItem(i.toString())});
    //     this.dummyData.splice(this.dummyData.findIndex(o => o.DwaybillNumber === localStorage.getItem(i.toString()), 1));
        
    //   }
    // }
  }

  ngOnDestroy(): void {
    if(localStorage.getItem("orderSort") === null){
      let rowArr :ISavedRowOrder[] = [];
      this.dummyData.map((i,ind) => {
        //localStorage.setItem(index.toString(), i.DwaybillNumber);
        let item: ISavedRowOrder = {Index: ind, Id: i.DwaybillNumber};
        rowArr.push(item);
      })
      console.log(rowArr.join('!'));
      localStorage.setItem("orderSort", rowArr.join(','));
    }
  }

  orderClick(order: IOrder){
    // if(this.sorting){
    //   this.placeAtStartPosition(this.dummyData, order);
    // }else{
    //   this.router.navigate(["/dwaybillDetails"], { state: { info: order } });
    // }

    this.router.navigate(["/dwaybillDetails"], { state: { info: order } });
  }

  onDrop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.dummyData, event.previousIndex, event.currentIndex);
  }

  sort(e: any){
    localStorage.clear();
    this.sorting = !this.sorting;
    if(this.sorting){
      this.btnType = "normal";
      this.btnStyle = "outlined";
      this.btnText = "გათიშვა";
    }else{
      this.btnType = "default";
      this.btnStyle = "contained";
      this.btnText = "სორტირება";
    }
  }

  placeAtStartPosition(itemArray: IOrder[], item: IOrder){
    var itemIndex = itemArray.indexOf(item);
    itemArray.splice(itemIndex, 1);
    itemArray.unshift(item);
  }

  changeArrayIndex(orders: IOrder[], savedOrderIndexes: ISavedRowOrder[]){
    const sortedOrders: IOrder[] = [];
    const orderMap: Record<string, IOrder> = {};

    // Map the orders to their IDs for efficient lookup
    orders.forEach((order) => {
      orderMap[order.DwaybillNumber] = order;
    });

    // Sort the orders based on the order index array
    savedOrderIndexes.forEach((index : ISavedRowOrder) => {
      const order = orderMap[index.Id];
      if (order) {
        sortedOrders[index.Index] = order;
      }
    });

    // Add any remaining orders that weren't in the index array to the end
    orders.forEach((order) => {
      if (!orderMap[order.DwaybillNumber]) {
        sortedOrders.push(order);
      }
    });

    return sortedOrders;
  }
}

export interface IOrder{
  DwaybillNumber: string;
  Preseller: string;
  Remark: string;
  Status: boolean;
  Comment: string;
}

export interface ISavedRowOrder{
  Index: number;
  Id: string;
}