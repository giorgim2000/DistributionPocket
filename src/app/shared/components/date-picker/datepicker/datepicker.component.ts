import { Component, NgModule, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import * as MomentJS from 'moment';
import { DxMenuModule, DxDateBoxModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input()
  start_date: Date = MomentJS().startOf('month').toDate();
  @Input()
  end_date: Date = MomentJS().endOf('month').toDate();

  @Output() valuesChanged: EventEmitter<any> = new EventEmitter();

  items: any[] = [];
  date1: Date = MomentJS().startOf('month').toDate();
  date2: Date = MomentJS().endOf('month').toDate();
  isPopupVisible = false;
  offsetP: string | undefined;
  apexFormatter = {
    formatter: (param: any) => {
      return this.format(param);
    },
    parser: (param: any) => {
      return this.parse(param);
    }
  };
  public format(date: Date) {
    return MomentJS(date).format('dd/MM/yyyy');
  }
  public parse(date: string) {
    return MomentJS(date).toDate();
  }

  constructor() { }

  ngOnInit(): void {
    this.date1 = this.start_date;
    this.date2 = this.end_date;
    this.items = [
      {
        name: '', icon: 'event', items: [
          {
            name: 'მიმდინარე',
            items: [
              { name: 'დღე', data: 'current_day' },
              { name: 'კვირა', data: 'current_week' },
              { name: 'თვე', data: 'current_month' },
              { name: 'კვარტალი', data: 'current_quarter' },
              { name: 'წელი', data: 'current_year' },
            ],
          },
          {
            name: 'გასული',
            items: [
              { name: 'დღე', data: 'previous_day' },
              { name: 'კვირა', data: 'previous_week' },
              { name: 'თვე', data: 'previous_month' },
              { name: 'კვარტალი', data: 'previous_quarter' },
              { name: 'წელი', data: 'previous_year' },
            ],
          },
          {name: 'იანვარი', data: '0'},
          {name: 'თებერვალი', data: '1'},
          {name: 'მარტი', data: '2'},
          {name: 'აპრილი', data: '3'},
          {name: 'მაისი', data: '4'},
          {name: 'ივნისი', data: '5'},
          {name: 'ივლისი', data: '6'},
          {name: 'აგვისტო', data: '7'},
          {name: 'სექტემბერი', data: '8'},
          {name: 'ოქტომბერი', data: '9'},
          {name: 'ნოემბერი', data: '10'},
          {name: 'დეკემბერი', data: '11'},          
        ]
      }
    ];
  }
  ngAfterViewInit() {
    this.pickerValueChanged();
  }
  pickerValueChanged(event?: any) {    
    this.valuesChanged.emit({ date1: this.date1, date2: this.date2 });
  }

  itemClick(event: any) {
    switch (event.itemData.data) {
      case "current_day":
        this.date1 = MomentJS().startOf('day').toDate();
        this.date2 = MomentJS().endOf('day').toDate();
        break;
      case "current_week":
        this.date1 = MomentJS().startOf('isoWeek').toDate();
        this.date2 = MomentJS().endOf('isoWeek').toDate();
        break;
      case "current_month":
        this.date1 = MomentJS().startOf('month').toDate();
        this.date2 = MomentJS().endOf('month').toDate();
        break;
      case "current_quarter":
        this.date1 = MomentJS().startOf('quarter').toDate();
        this.date2 = MomentJS().endOf('quarter').toDate();
        break;
      case "current_year":
        this.date1 = MomentJS().startOf('year').toDate();
        this.date2 = MomentJS().endOf('year').toDate();
        break;

      case "previous_day":
        this.date1 = MomentJS().subtract(1, 'day').startOf('day').toDate();
        this.date2 = MomentJS().subtract(1, 'day').endOf('day').toDate();
        break;
      case "previous_week":
        this.date1 = MomentJS().subtract(1, 'week').startOf('isoWeek').toDate();
        this.date2 = MomentJS().subtract(1, 'week').endOf('isoWeek').toDate();
        break;
      case "previous_month":
        this.date1 = MomentJS().subtract(1, 'month').startOf('month').toDate();
        this.date2 = MomentJS().subtract(1, 'month').endOf('month').toDate();
        break;
      case "previous_quarter":
        this.date1 = MomentJS().subtract(1, 'quarter').startOf('quarter').toDate();
        this.date2 = MomentJS().subtract(1, 'quarter').endOf('quarter').toDate();
        break;
      case "previous_year":
        this.date1 = MomentJS().subtract(1, 'year').startOf('year').toDate();
        this.date2 = MomentJS().subtract(1, 'year').endOf('year').toDate();
        break;
      default:        
          let m=(Number)(event.itemData.data);
          if(m>=0){            
            let d=new Date();
            this.date1=new Date(d.getFullYear(),m,1);           
            this.date2=MomentJS(this.date1).endOf('month').toDate();
          }
          
        
        break;
    }
  }
  closeOnOutsideClick(event: any) {
  }
  btnClick() {
    this.isPopupVisible = !this.isPopupVisible;
  }
}


@NgModule({
  imports: [
    DxMenuModule,
    DxDateBoxModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ DatepickerComponent ],
  exports: [ DatepickerComponent ]
})
export class DatePickerModule { }