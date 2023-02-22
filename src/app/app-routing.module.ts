import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent, VisitsTabComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxPopupModule, DxTextAreaModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitComponent } from './pages/visit/visit.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DwaybillDetailsComponent } from './pages/dwaybill-details/dwaybill-details.component';
import { BalanceComponent } from './pages/balance/balance.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
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
    path: 'orders',
    component: OrdersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'dwaybillDetails',
    component: DwaybillDetailsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
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
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'visit',
    component: VisitComponent,
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
      DxTextBoxModule, DxPopupModule, DxTextAreaModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    VisitComponent,
    OrdersComponent,
    DwaybillDetailsComponent,
    BalanceComponent
  ]
})
export class AppRoutingModule { }
