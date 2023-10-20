import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { PATHS } from '../constants/router/paths';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

    constructor(private autenticacionService: AutenticacionService, private router: Router, private modalDialogService: ModalDialogService) { }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        /* Actualmente hay dos tokens, un jwt (Viene de sistema externo) y otro para login :( hay que valdiar ambos escenarios */

        const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>Por razones de seguridad, su sesión expiró</h4>';

        
        if (this.autenticacionService.tokenLogin) {
            if (this.isTokenExpirado()) {
                this.autenticacionService.logout();
                this.modalDialogService.showDialog('info', 'Su sesión ha expirado',
                    message, response => {
                        if (!response) {
                            return;
                        }
                        this.router.navigate([PATHS.login]);
                    });
                return false;
            }
        }

        if (this.autenticacionService.token) {
            if (this.isTokenExpirado()) {
                this.autenticacionService.logout();
                this.modalDialogService.showDialog('info', 'Su sesión ha expirado',
                    message, response => {
                        if (!response) {
                            return;
                        }
                        this.router.navigate([PATHS.login]);
                    });
                return false;
            }
            return true;
        }

        this.router.navigate([PATHS.login]);
        return false;
    }

    private isTokenExpirado(): boolean {

        let token = this.autenticacionService.token;
        let payload: any;

        /* Actualmente hay dos tokens, un jwt (Viene de sistema externo) y otro para login :( tentativamente viene de login y no manejará sesión */
        if (this.autenticacionService.tokenLogin) {
            return false;
        }

        try {
            payload = this.autenticacionService.obtenerDatosToken(token);
        } catch (error) {
            return true;
        }

        let now = new Date().getTime() / 1000;

        if (payload.exp < now) {
            return true;
        }

        return false;
    }

}
