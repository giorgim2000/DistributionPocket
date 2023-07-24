import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, CreateAccountFormComponent, VisitsTabComponent, DatePickerModule } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxPopupModule, DxTextAreaModule, DxSelectBoxModule, DxNumberBoxModule, DxMenuModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitComponent } from './pages/visit/visit.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DwaybillDetailsComponent } from './pages/dwaybill-details/dwaybill-details.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { CollectCashComponent } from './pages/collect-cash/collect-cash.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: 'visits',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'visits/:Ddate/:Acc',
    component: VisitComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'visits/:Ddate/:Acc/orders/:type',
    component: OrdersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'visits/:Ddate/:Acc/orders/:type/:id',
    component: DwaybillDetailsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'balance',
    component: BalanceComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'visits/:Ddate/:Acc/collect-cash',
    component: CollectCashComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'visits-tab',
    component: VisitsTabComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
     DxDataGridModule, DxFormModule, CommonModule,
      DxButtonModule, FormsModule, DxDateBoxModule,
      DxTextBoxModule, DxPopupModule, DxTextAreaModule,
      DxSelectBoxModule, DragDropModule, DxNumberBoxModule,
      DxMenuModule, DatePickerModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    VisitComponent,
    OrdersComponent,
    DwaybillDetailsComponent,
    BalanceComponent,
    CollectCashComponent
  ]
})
export class AppRoutingModule { }


