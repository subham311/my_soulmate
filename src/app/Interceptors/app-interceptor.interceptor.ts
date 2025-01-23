import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessageService } from '../Services/message.service';
/** SUMAN MITRA ADDED THIS */
export const BYPASS_LOG = new HttpContextToken(() => false);
/*** END */

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor( private spinner: NgxSpinnerService, private msg:MessageService) {}
  
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(BYPASS_LOG) === true){
      return next.handle(req);
    }
      this.spinner.show();

      return next.handle(req).pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          const started = Date.now();            
          const elapsed = Date.now() - started;
          this.spinner.hide()
          if(error.status)
          this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)
          else
          this.msg.globalError('Unknown error!')
          return throwError(error);
        })
      );

  } 
}
