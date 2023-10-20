import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageRequest } from 'src/app/models/pager/page.request';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { ID_TIPO_CATALOGO } from 'src/app/modules/shared/constants/cronologia/catalogo';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';
import { FiltroReceta } from 'src/app/models/receta/filtro-receta';
import { String } from 'typescript-string-operations';
import { ModelReceta } from 'src/app/models/receta/model-receta';


@Injectable({
  providedIn: 'root'
})
export class RecetaService extends HttpService {

	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}

	public getDatosPorFiltro(filter: ModelReceta, idTipoCatalogo: number, idee?: string,): Observable<any> {

		let endpoint: string;
		let alternativeBody: any;

		switch (idTipoCatalogo) {
			case ID_TIPO_CATALOGO.ooads:
				endpoint = ENDPOINTS.recetas.ooads;
				break;
			case ID_TIPO_CATALOGO.unidades:
				endpoint = ENDPOINTS.recetas.unidades;
				break;
			case ID_TIPO_CATALOGO.medicamentos:
				endpoint = ENDPOINTS.recetas.medicamentos;
				// alternativeBody = String.Format('{ "model": { "idee": "{0}"} }', idee);
				break;
			default:
				break;
		}

		const body = alternativeBody ? alternativeBody : filter;

		return this.http.post<any>(endpoint, body, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public getRecetas(pageRequest: PageRequest<FiltroReceta>): Observable<any> {
		return this.http.post<any>(ENDPOINTS.recetas.recetas, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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
