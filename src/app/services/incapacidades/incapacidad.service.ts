import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { ID_TIPO_CATALOGO } from 'src/app/modules/shared/constants/cronologia/catalogo';
import { PageRequest } from 'src/app/models/pager/page.request';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';
import { ModelIncapacidad } from 'src/app/models/incapacidad/model-Incapacidad';
import { FiltroIncapacidad } from 'src/app/models/incapacidad/filtro-incapacidad';
import { FiltroIncapacidadDetalle } from 'src/app/models/incapacidad/filtro-incapacidad-detalle';
import { Incapacidad } from 'src/app/models/incapacidad/incapacidad';
import { ModelIncapacidadDetalle } from 'src/app/models/incapacidad/model-incapacidad-detalle';
import { IncapacidadDetail } from 'src/app/models/incapacidad/incapacidad-detail';
import { FiltrosIncapacidad, IncapacidadRequest } from 'src/app/models/incapacidad/incapacidadRequest';

@Injectable({
	providedIn: 'root'
})
export class IncapacidadService extends HttpService {

	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}

	public getDatosPorFiltro(filter: ModelIncapacidad, idTipoCatalogo: number, idee?: string,): Observable<any> {

		let endpoint: string;

		switch (idTipoCatalogo) {
			case ID_TIPO_CATALOGO.ooads:
				endpoint = ENDPOINTS.incapacidades.ooads;
				break;
			case ID_TIPO_CATALOGO.unidades:
				endpoint = ENDPOINTS.incapacidades.unidades;
				break;
			case ID_TIPO_CATALOGO.incapacidades:
				endpoint = ENDPOINTS.incapacidades.incapacidades;
				break;
			case ID_TIPO_CATALOGO.diagnosticos:
				endpoint = ENDPOINTS.incapacidades.diagnosticos;
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

	public getResultadosIncapacidades(pageRequest: PageRequest<FiltroIncapacidad>): Observable<any> {
		return this.http.post<any>(ENDPOINTS.incapacidades.incapacidades, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public getIncapacidadDetalle(modelIncapacidadDetalle: ModelIncapacidadDetalle): Observable<any>{
		return this.http.post<Incapacidad>(ENDPOINTS.incapacidades.detalle, modelIncapacidadDetalle, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public getIncapacidadDetailByFolio(folio: String): Observable<any>{
		return this.http.get<Incapacidad>(ENDPOINTS.incapacidad.detalle +'/'+ folio).pipe(
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

	public getIncapacidadDetailByFolioNSSAgregadoMedico(folio: String, nss: String, agregadoMedico: String): Observable<any>{
		return this.http.get<IncapacidadDetail>(ENDPOINTS.incapacidad.detalle +'/'+ folio +'/'+ nss +'/'+ agregadoMedico).pipe(
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

	public getResultadosIncapacidadesNuevo(pageRequest: PageRequest<FiltrosIncapacidad>): Observable<any> {
		return this.http.post<any>(ENDPOINTS.incapacidad.historico, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public getDatosPorFiltroNuevo(filter: IncapacidadRequest, idTipoCatalogo: number, idee?: string,): Observable<any> {

		let endpoint: string;

		switch (idTipoCatalogo) {
			case ID_TIPO_CATALOGO.ooads:
				endpoint = ENDPOINTS.incapacidad.delegaciones;
				break;
			case ID_TIPO_CATALOGO.unidades:
				endpoint = ENDPOINTS.incapacidad.unidades;
				break;
			case ID_TIPO_CATALOGO.incapacidades:
				endpoint = ENDPOINTS.incapacidad.historico;
				break;
			case ID_TIPO_CATALOGO.diagnosticos:
				endpoint = ENDPOINTS.incapacidad.diagnosticos;
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
