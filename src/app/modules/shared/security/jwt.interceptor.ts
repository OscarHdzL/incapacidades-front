import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { String } from 'typescript-string-operations';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { PATHS } from '../constants/router/paths';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

   constructor(private auth: AutenticacionService,
      private router: Router,
      private dataService: DataService,
      private spinner: NgxSpinnerService,
      private modalDialogService: ModalDialogService) { }

   private handleAuthError(err: HttpErrorResponse): Observable<any> {
      if (err.status === 401 || err.status === 403) {
         if (err.statusText.toUpperCase() == 'UNAUTHORIZED') {
            const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>Por razones de seguridad, su sesión expiró</h4>';
            this.modalDialogService.showDialog('info', 'Su sesión ha expirado',
               message, response => {
                  if (!response) {
                     return;
                  }
                  this.router.navigate([PATHS.login]);
               });
            return throwError(err);
         } else {
            this.spinner.hide();
            this.router.navigate(['']);
            return of();
         }
      }
      return throwError(err);
   }

   public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const emptyAuthHeader = String.IsNullOrWhiteSpace(request.headers.get('Authorization'));

      /* Para servicios que no contienen token y se excluyen de autorización */
      if (request.headers.get('Anonymous') != undefined) {
         const newHeaders = request.headers.delete('Anonymous')
         const newRequest = request.clone({ headers: newHeaders });
         return next.handle(newRequest);
      }

      /* Inyección de token */
      if (this.auth.token != '' && emptyAuthHeader) {
         request = request.clone({
            setHeaders: {
               Authorization: ('bearer ' + this.auth.token).replace("\"", "").replace("\"", "")
            }
         });
      }

      // Solo para los request de la app //
      //  @FIM-ME Esto debe morir, solo buscar un argumento */
      // if (request.url.indexOf("nidp") < 0 && request.url.indexOf("assets") < 0) {
      //    if (this.dataService.getModel().netIq) {
      //       request = request.clone({ url: '/hc-consultas-medicas-api' + request.url });
      //    } else {
      //       if (request.url.indexOf("mshc-notas") < 0 && request.url.indexOf("mshc-auxiliares") < 0){
      //          request = request.clone({ url: '/hc-consultas-medicas-jwt-api/jwt' + request.url });
      //       }
      //    }
      // }

      return next.handle(request).pipe(catchError(err => {
         return this.handleAuthError(err);
      }));
   }

}