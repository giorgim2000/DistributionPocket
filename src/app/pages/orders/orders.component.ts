import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder, ISavedRowOrder, VisitDetails } from 'src/app/shared/services/Dtos';

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
  Data: VisitDetails[] = [];
  loading: boolean = false;
  completedUrl: string = "../../../assets/completed.png";
  pendingUrl: string = "../../../assets/pending.png";
  rejectedUrl: string = "../../../assets/rejected.png";
  pageType : string = "";
  tabClassName: string = "";
  //visitData: any = {};
  sorting: boolean = false;
  btnType: string = "default";
  btnStyle: string = "contained";
  btnText: string = "სორტირება";
  orderSortObject: object = {};
  Iud: string | null = null;
  Acc: string = '';
  Ddate: string = '';

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) 
  { 
    //this.visitData = history.state.VisitInfo;
    this.Ddate = route.snapshot.paramMap.get('Ddate') ?? '';
    this.Iud = route.snapshot.paramMap.get('type'); 
    this.Acc = route.snapshot.paramMap.get('Acc') ?? '';
  }

  ngOnInit(): void {
    this.loading = true;
    
    if(this.Iud === '0')
    {
      this.pageType = 'შეკვეთები';
      this.tabClassName = 'tabDiv';
    }else{
      this.pageType = 'დაბრუნებები';
      this.tabClassName = 'returnTabDiv';
    }
    this.getData(this.Acc, Number(this.Iud));
    if(localStorage.getItem("orderSort") != null){

      //this.changeArrayIndex(this.dummyData, localStorage.getItem("orderSort"));
      //console.log(localStorage.getItem("orderSort"));
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
      let rowArr :any[] = [];
      this.dummyData.map((i,ind) => {
        //localStorage.setItem(index.toString(), i.DwaybillNumber);
        let item: ISavedRowOrder = {Index: ind, Id: i.DwaybillNumber};
        rowArr.push(item.Index + ',' + item.Id);
      })
      console.log(rowArr.join('!'));
      localStorage.setItem("orderSort", rowArr.join('!'));
    }

    this.sortArray();
  }
                                                                           
  getData(account: string, iud: number){
    this.http.get<any>(`http://10.10.0.85:82/Crm/GetCustomerDocsByExpeditor.json?ddate=${this.Ddate}&Acc=${account}&Iud=${iud}`)
    .subscribe({
      next: (result) => {
      this.Data = result.Result;
      this.loading = false;
    },
    error: (err) => {
      console.log(err);
      // this.router.navigate(["/login-form"]);
      this.loading = false;
    }});
  }

  sortArray(){
    let sortString: string | null = localStorage.getItem('orderSort');
    let arr = sortString?.split('!');
    let ordersArr : ISavedRowOrder[]=[];
    arr?.forEach(item => {
      ordersArr.push({Index: item.split(',')[0] as unknown as number, Id: item.split(',')[1]});
    })
    console.log("ORDERS ARRAY");
    console.log(ordersArr);
  }

  orderClick(order: VisitDetails){
    // if(this.sorting){
    //   this.placeAtStartPosition(this.dummyData, order);
    // }else{
    //   this.router.navigate(["/dwaybillDetails"], { state: { info: order } });
    // }

    this.router.navigate([`visits/${this.Ddate}/${this.Acc}/${this.Iud}/${order.Docs_ID}`], { state: { info: order} });
  }

  onDrop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.Data, event.previousIndex, event.currentIndex);
  }

  sort(e: any){
    alert("SORTSHI SHEMOVIDA!");
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

