import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Nss } from 'src/app/models/busqueda/nss';
import { FiltroSelect } from 'src/app/models/cronologia/filtro-select';
import { Paciente } from 'src/app/models/data/paciente';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { ENDPOINTS } from 'src/app/modules/shared/constants/api/endpoints';
import { MENSAJES_ERROR } from 'src/app/modules/shared/constants/messages/business-messages';
import { HttpService } from '../common/http-client/http.service';
import { ModalDialogService } from '../common/modal-dialog/modal-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService extends HttpService {

	constructor(private http: HttpClient, protected spinner: NgxSpinnerService, private modalDialogService: ModalDialogService) {
		super();
	}

    public getNucleoFamiliar(pageRequest: PageRequest<Nss>): Observable<any> {
      return this.http.post<any>(ENDPOINTS.busqueda.pacientes, pageRequest, { observe: 'response', headers: this.httpHeadersAnon }).pipe(
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
