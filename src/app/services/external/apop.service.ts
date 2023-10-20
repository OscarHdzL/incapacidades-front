import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';
import { String } from 'typescript-string-operations';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { APOP_USER, TOKEN_APOP } from 'src/app/modules/shared/constants/api/token';

@Injectable({
  providedIn: 'root'
})
export class ApopService {

  constructor(private http: HttpClient, protected spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService) {
  }

  public httpHeadersToken = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getToken(): Observable<any> {

    const credenciales = btoa(TOKEN_APOP.user + ':' + TOKEN_APOP.password);
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('scope', 'read');
    params.set('grant_type', 'password');
    params.set('username', APOP_USER.username);
    params.set('password', APOP_USER.password);
    // params.set('Access-Control-Allow-Origin:', '*');

    return this.http.post<any>(ENDPOINTS.externo.apop.carnet, params.toString(), { headers: httpHeaders }).pipe(
      (response: any) => {
        return response;
      },
      catchError((error: HttpErrorResponse) => {
        if (error.status == 409 || error.status == 412 || error.status == 200 || error.status == 400) {
          return new Promise((resolve) => {
            resolve(error);
          });
        } else {
          this.handleError(error);
        }
      }
      ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      this.spinner.hide();
      return throwError(error);
    }
    this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500);
    this.spinner.hide();
    return throwError(error);
  }

}
