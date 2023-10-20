import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';
import { ID_TIPO_CATALOGO } from 'src/app/modules/shared/constants/cronologia/catalogo';
import { String } from 'typescript-string-operations';
import { ModelLaboratorio } from 'src/app/models/laboratorio/model-laboratorio';
import { FiltroLaboratorio } from 'src/app/models/laboratorio/filtro-laboratorio';
import { PageRequest } from 'src/app/models/pager/page.request';

@Injectable({
	providedIn: 'root'
})
export class LaboratorioService extends HttpService {

	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}

	public getDatosPorFiltro(filter: ModelLaboratorio, idTipoCatalogo: number, idee?: string,): Observable<any> {

		let endpoint: string;

		switch (idTipoCatalogo) {
			case ID_TIPO_CATALOGO.ooads:
				endpoint = ENDPOINTS.laboratorio.ooads;
				break;
			case ID_TIPO_CATALOGO.unidades:
				endpoint = ENDPOINTS.laboratorio.unidades;
				break;
			case ID_TIPO_CATALOGO.estudios:
				endpoint = ENDPOINTS.laboratorio.estudios;
				break;
			case ID_TIPO_CATALOGO.pruebas:
				endpoint = ENDPOINTS.laboratorio.pruebas;
				break;	
			default:
				break;
		}

		return this.http.post<any>(endpoint, filter, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public getResultadosLaboratorio(pageRequest: PageRequest<FiltroLaboratorio>): Observable<any> {
		return this.http.post<any>(ENDPOINTS.laboratorio.resultadosLaboratorio, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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
