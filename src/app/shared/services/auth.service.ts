import { Component, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { buffer } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';


export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';
// const defaultUser = {
//   email: 'nodari@example.com',
//   avatarUrl: 'http://gbf.ge/app/uploads/2020/08/nodari-olimpiuri-xabareltan.jpg'
// };

interface UserResponse{
  DisplayName : string;
  UserName : string;
  SessionId : string;
  ReferrerUrl : string;
  ResponseStatus : object;
}

@Injectable()
export class AuthService {
  private _user: IUser | null = null;
  
  get loggedIn(): boolean {
    return !!this.cookieService.get("X-ss-id");
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient, private cookieService : CookieService) {}

  async logIn(username: string, password: string) {
    let creds = `${username}:${password}`;
    let header = new HttpHeaders({
      'Authorization': "Basic " + btoa(creds)
    });
    let options = {
      headers: header
    };
    try {
        var resp = await this.http.post<UserResponse>("http://localhost:82/auth.json", null, options)
        .subscribe({next: resp =>{
          this.cookieService.set("X-ss-id", resp.SessionId);
          this.router.navigate(["/home"])
        },
        error: error =>{
          notify("სახელი ან პაროლი არასწორია!", 'error', 2000);
          location.reload();
        }
      });
      
      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

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

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
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
