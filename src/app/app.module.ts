import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, CreateAccountFormModule, LoginFormModule, VisitsTabComponent } from './shared/components';
import { AuthService, ScreenService, AppInfoService, AddHeaderInterceptor } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { DatePickerModule } from './shared/components/date-picker/datepicker/datepicker.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    CreateAccountFormModule,
    LoginFormModule,
    DatePickerModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ScreenService,
    CookieService,
    AppInfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
