import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bitacora } from 'src/app/models/cronologia/bitacora';
import { DatosPaciente } from 'src/app/models/cronologia/datos-paciente';
import { FiltroSelect } from 'src/app/models/cronologia/filtro-select';
import { DetalleNotaMedicaRequest } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica-request';
import { PageRequest } from 'src/app/models/cronologia/page-request';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { ID_TIPO_CATALOGO } from 'src/app/modules/shared/constants/cronologia/catalogo';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { String } from 'typescript-string-operations';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';
import { Incapacidad } from 'src/app/models/incapacidad/incapacidad';

@Injectable({
	providedIn: 'root'
})
export class CronologiaService extends HttpService {

	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}

	public getDatosPaciente(idee: string): Observable<DatosPaciente> {

		const body = String.Format('{ "idee": "{0}"}', idee);

		return this.http.post<any>(ENDPOINTS.cronologia.paciente, body, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public postBitacora(bitacora: Bitacora): Observable<Bitacora>  {

		return this.http.post<any>(ENDPOINTS.cronologia.bitacora, bitacora, { observe: 'response', headers: this.httpHeadersToken }).pipe(
			(response: any) => {
				return response;
			},
			catchError((error: HttpErrorResponse) => {
				if (error.status == 409 || error.status == 412 || error.status == 200 || error.status == 400 || error.status == 500) {
					return new Promise((resolve) => {
						resolve(error);
					});
				} else {
					this.spinner.hide();
				}
			}
		));
	}

	public getDatosPorFiltro(filter: FiltroSelect, idTipoCatalogo: number): Observable<any> {

		let endpoint: string;

		switch (idTipoCatalogo) {
			case ID_TIPO_CATALOGO.ooads:
				endpoint = ENDPOINTS.cronologia.ooads;
				break;
			case ID_TIPO_CATALOGO.unidades:
				endpoint = ENDPOINTS.cronologia.unidades;
				break;
			case ID_TIPO_CATALOGO.especialidades:
				endpoint = ENDPOINTS.cronologia.especialidades;
				break;
			default:
				break;
		}

		return this.http.post<any>(endpoint, filter, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
			(response: any) => {
				return response;
			},
			catchError((error: HttpErrorResponse) => {
				if (error.status == 409 || error.status == 412 || error.status == 200 || error.status == 400 || error.status == 500) {
					return new Promise((resolve) => {
						resolve(error);
					});
				} else {
					this.handleError(error);
				}
			}
		));
	}

	public getNotasMedicas(pageRequest: PageRequest<FiltroSelect>): Observable<any> {
		return this.http.post<any>(ENDPOINTS.cronologia.notasMedicas, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
			(response: any) => {
				return response;
			},
			catchError((error: HttpErrorResponse) => {
				if (error.status == 409 || error.status == 412 || error.status == 200 || error.status == 400 || error.status == 500) {
					return new Promise((resolve) => {
						resolve(error);
					});
				} else {
					this.handleError(error);
				}
			}
		));
	}

	public getDetalleNotaMedica(detalleNotaMedica: DetalleNotaMedicaRequest): Observable<any> {
		return this.http.post<any>(ENDPOINTS.cronologia.detalleNotaMedica, detalleNotaMedica, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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

	public getRecetaDetalle(pageRequest: PageRequest<any>): Observable<any> {
		return this.http.post<any>(ENDPOINTS.cronologia.recetaDetalle, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
			(response: any) => {
				return response;
			},
			catchError((error: HttpErrorResponse) => {
				if (error.status == 409 || error.status == 412 || error.status == 400) {
					return new Promise((resolve) => {
						resolve(error);
					});
				} else {
					this.handleError(error);
				}
			}
		));
	}

	public getIndicadoresAuxiliares(idee: string, ideeFecha: string): Observable<any> {

		const body = String.Format('{ "idee": "{0}", "ideeFecha": "{1}"}', idee, ideeFecha);

		return this.http.post<any>(ENDPOINTS.indicadores.indicadores, body, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
			(response: any) => {
				return response;
			},
			catchError((error: HttpErrorResponse) => {
				if (error.status == 409 || error.status == 412 || error.status == 400) {
					return new Promise((resolve) => {
						resolve(error);
					});
				} else {
					this.handleError(error);
				}
			}
		));
	}

	public getNotaByFolio(folio: String): Observable<any>{
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


	private handleError(error: HttpErrorResponse) {
		if (error.status == 401) {
			this.spinner.hide();
			return throwError(error);
		}
		this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500);
		this.spinner.hide();
		return throwError(error);
	}

	public getCarnetApo(idee: string): Observable<any> {

		let params = new HttpParams()
		.set('idee', idee);

		return this.http.get<any>(ENDPOINTS.cronologia.carnet, { observe: 'response', params: params, headers: this.httpHeadersAnon }).pipe(
			(response: any) => {
				return response;
			},
			catchError((error: HttpErrorResponse) => {
				if (error.status == 409 || error.status == 412 || error.status == 200 || error.status == 400 || error.status == 500) {
					return new Promise((resolve) => {
						resolve(error);
					});
				} else {
					this.handleError(error);
				}
			}
		));
	}


	

}
