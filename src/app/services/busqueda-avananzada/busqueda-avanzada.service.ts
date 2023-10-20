import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FiltroBusquedaNss } from 'src/app/models/busqueda/filtro-busqueda-nss';
import { PageRequest } from 'src/app/models/pager/page.request';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { String } from 'typescript-string-operations';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BusquedaAvanzadaService extends HttpService {

  constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}
  
  public getOoads(): Observable<any> {
		return this.http.post<any>(ENDPOINTS.busquedaAvanzada.ooads, null, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

  public getUnidades(ooad: string): Observable<any>{

    const body = String.Format('{ "ooad": "{0}"}', ooad);

    return this.http.post<any>(ENDPOINTS.busquedaAvanzada.unidades, body, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

  public getDiagnosticos(pageRequest: PageRequest<FiltroBusquedaNss>): Observable<any> {
    return this.http.post<any>(ENDPOINTS.busquedaAvanzada.diagnosticos, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

  public getPacientesPorFiltro(pageRequest: PageRequest<FiltroBusquedaNss>): Observable<any> {
	return this.http.post<any>(ENDPOINTS.busquedaAvanzada.pacientes, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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
		if (error.status == 500 && error.message.includes('502')) {
			this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500_502);
			this.spinner.hide();
			return throwError(error);
		}
		this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500);
		this.spinner.hide();
		return throwError(error);
	}
  
}
