import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private notification: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      map(res => {
          // console.log("Passed through the interceptor in response");
          return res
      }),
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
          let errorMsg = '';
          if (error.status == 401) {
            this.notification.showError('You need to login', 'Unauthorized');
            // return this.router.navigateByUrl('/login');
          }
          this.notification.showError((error.error?.Message ? error.error.Message : "Something Went Wrong"), 'Server Side');
          // if (error.error instanceof ErrorEvent) {
          //   console.log(error);
          // } else {

          // }
          // console.log(errorMsg);
          return throwError(errorMsg);
      })
  )
  }
}
