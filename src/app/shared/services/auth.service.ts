import { Component, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable, buffer, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map } from 'rxjs/operators';
import { UserResponse, IUserInfoResponse } from './Dtos';
import notify from 'devextreme/ui/notify';


const defaultPath = '/';


@Injectable()
export class AuthService {
  static userName: string | undefined;
  //static userInfo: IUserInfo | undefined;
  
  get loggedIn(): boolean {
    return !!this.cookieService.get("X-ss-id");
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient, private cookieService : CookieService) {}

  logIn(username: string, password: string) {
    let creds = `${username}:${password}`;
    let header = new HttpHeaders({
      'Authorization': "Basic " + btoa(creds)
    });
    let options = {
      headers: header
    };
    let result = {isOk: false, data: ''};
    return this.http.post<UserResponse>("http://localhost:82/auth.json", null, options)
        .pipe(
          map(resp => {
            result.isOk = true;
            this.cookieService.set("X-ss-id", resp.SessionId);
            AuthService.userName = resp.UserName;
            this.getUserInfo();
            return result;
          }),
          catchError(error => {
            if(error.status === 401)
              result.data = 'სახელი ან პაროლი არასწორია!';
            else
              result.data = 'სერვისთან დაკავშირება ვერ მოხერხდა!';
            
            result.isOk = false;
            return of(result);
          })
        );
  }

  async getUserInfo() {
    this.http.get<IUserInfoResponse>(`http://localhost:82/crm/GetExpeditorInfo.json?Username=${AuthService.userName}`)
    .subscribe({
      next: (result) => {
        localStorage.setItem('MobileUserId', result.Result[0].MobileUserId.toString());
        localStorage.setItem('PayAcc', result.Result[0].PayAcc.toString());
        localStorage.setItem('PayOperId', result.Result[0].PayOperId.toString());
    },
    error: (err) => {
      alert("მომხმარებელს შეზღუდული აქვს გარკვეული უფლებები!");
    }});
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      //console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async logOut() {
    AuthService.userName = '';
    this.cookieService.delete("X-ss-id");
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
