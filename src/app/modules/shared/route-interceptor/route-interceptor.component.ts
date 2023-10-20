import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bitacora } from 'src/app/models/cronologia/bitacora';
import { Paciente } from 'src/app/models/data/paciente';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { PATHS } from '../constants/router/paths';

@Component({
  selector: 'app-route-interceptor',
  templateUrl: './route-interceptor.component.html',
  styleUrls: ['./route-interceptor.component.css']
})
export class RouteInterceptorComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService,
    private data: DataService, private router: Router, private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {

    this.autenticacionService.logout();
    const token = this.router.url.split('/').pop();
    this.autenticacionService.token = token;

    let datosToken: any;

    try {
      datosToken = this.autenticacionService.obtenerDatosToken(token);
    } catch (error) {
      const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>El token proporcionado no es válido</h4>';
      this.modalDialogService.showDialog('info', 'Token inválido',
        message, response => {
          if (!response) {
            return;
          }
          return this.router.navigate([PATHS.login]);
        });
    }

    this.data.model.interno.nombre = datosToken?.nombre + ' ' + datosToken?.primerApellido + ' ' + datosToken?.segundoApellido;
    this.data.model.interno.matricula = datosToken.matricula;
    this.data.model.tokenSession = this.autenticacionService.token;
    this.data.model.bitacora = new Bitacora(datosToken);

    /* Verifico si traigo información de paciente para cronología */
    if(datosToken.paciente){
      this.data.model.paciente = new Paciente(datosToken.paciente);
    }

    this.data.store();

    /* Si el token ya venció, desde aquí corto el flujo */
    let now = new Date().getTime() / 1000;

    if (datosToken.exp < now) {
      const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>Por razones de seguridad, su sesión expiró</h4>';
      this.modalDialogService.showDialog('info', 'Su sesión ha expirado',
        message, response => {
          if (!response) {
            return;
          }
          this.router.navigate([PATHS.login]);
        });
        return;
    }

    if (this.router.url.indexOf(PATHS.busquedaNssAvanzada, 7) > 0) {
      this.autenticacionService.indBusquedaNSS = true;
      this.autenticacionService.indBusquedaAvanzada = true;
      this.router.navigate([PATHS.busquedaNssAvanzada]);
      return;
    } else if (this.router.url.indexOf(PATHS.cronologia, 7) > 0) {
      this.autenticacionService.indBusquedaNSS = false;
      this.router.navigate([PATHS.cronologia]);
      return;
    } else if (this.router.url.indexOf(PATHS.busquedaNss, 7) > 0) {
      this.autenticacionService.indBusquedaNSS = true;
      this.router.navigate([PATHS.busquedaNss]);
      return;
    } else {
      /* Path Inválido */
      const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>La ruta solicitada no es válida</h4>';
      this.modalDialogService.showDialog('info', 'Error',
        message, response => {
          if (!response) {
            return;
          }
          return this.router.navigate([PATHS.login]);
        });
    }
  }

}
