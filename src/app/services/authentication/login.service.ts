import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { TOKEN } from 'src/app/modules/shared/constants/api/token';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { String } from 'typescript-string-operations';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService extends HttpService {

	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}

	public postLogin(password: string, matricula: string): Observable<any> {
		this.spinner.show();
		const credenciales = btoa(TOKEN.user + ':' + TOKEN.password);
		const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'Basic ' + credenciales,
			'X-Requested-With': 'XMLHttpRequest' });
	
		let params = new URLSearchParams();
			params.set('grant_type', 'password');
			params.set('username', matricula);
			params.set('password', password);

		const body = String.Format('{ "usuario": "{0}", "contrasena": "{1}", "grant_type":"password"}', matricula, password);
	
		return this.http.post<any>(ENDPOINTS.autenticacion.login, body, { headers: httpHeaders }).pipe(map((response: any) => {
		  this.spinner.hide();
		  return response;
		},
		catchError(error => {
			if (error.status == 409 || error.status == 412 || error.status == 200 || error.status == 400 || error.status == 401) {
				return new Promise((resolve) => {
					resolve(error);
				});
			} else {
				this.handleError(error);
			}
		})));
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
