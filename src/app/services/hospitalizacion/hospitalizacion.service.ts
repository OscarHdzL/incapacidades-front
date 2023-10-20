import { Injectable } from '@angular/core';
import { HttpService } from '../common/http-client/http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';
import { Observable, throwError } from 'rxjs';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { catchError } from 'rxjs/operators';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';

@Injectable({
  providedIn: 'root'
})
export class HospitalizacionService extends HttpService {


	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}


  public getNotaInicialFolio(idNota: string): Observable<any>{
		return this.http.get<any>(ENDPOINTS.hospitalizacion.inicial +'/'+ idNota).pipe(
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
