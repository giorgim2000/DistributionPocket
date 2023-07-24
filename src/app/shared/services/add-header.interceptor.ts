import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(private cookieService : CookieService){}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      //Get the sessionId cookie
      const sessionId = this.cookieService.get('X-ss-id');
      const headers = {
        'X-ss-id': sessionId,
        'Content-Type': 'application/json'
      };
     //Clone the request and set the new header
      if (sessionId) {
        const updatedRequest = request.clone({ setHeaders: headers });
        // Pass the cloned request instead of the original request to the next handle
        return next.handle(updatedRequest);
      }
       return next.handle(request);
  }
}

