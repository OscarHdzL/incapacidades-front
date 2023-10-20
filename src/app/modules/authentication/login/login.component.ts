import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bitacora } from 'src/app/models/cronologia/bitacora';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { AlertService } from 'src/app/services/common/alert/alert.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { PATHS } from '../../shared/constants/router/paths';
import { ParentComponent } from '../../shared/parent/parent.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ParentComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private modalDialogService: ModalDialogService, private loginService: LoginService, private alertService: AlertService, private data: DataService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  public hide: boolean = true;

  ngOnInit(): void {
    this.autenticacionService.logout();
    this.createFormGroup();
  }

  public createFormGroup() {
    this.form = this.formBuilder.group({
      matricula: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public hidden() {
    this.hide = !this.hide;
  }

  public login(): void {
    window.scroll(0, 0);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.spinner.show();
      this.loginService.postLogin(this.form.value.password, this.form.value.matricula).subscribe((response: any) => {
        this.spinner.hide();
        if(response){
          this.autenticacionService.token = response.token;
          let datosToken: any;
          try {
            datosToken = this.autenticacionService.obtenerDatosToken(response.token);
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
          this.autenticacionService.indBusquedaNSS = true;
          this.autenticacionService.indBusquedaAvanzada = true;
          this.data.store();
          return this.router.navigate([PATHS.busquedaNssAvanzada]);
        }
      }, err => {
        this.spinner.hide();
        const message = '<h2 style="color: #2b65f0;"><i class="icon-exclamation-sign"></i></h2><h4>El usuario y/o la contraseña son incorrectas. Favor de verificar.</h4>';
        this.modalDialogService.showDialog('info', 'Atención',
          message, response => {
            if (!response) {
              return;
            }
            return;
          });
        return;
      });
    }
  }

}
