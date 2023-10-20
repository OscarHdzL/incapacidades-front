import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { PATHS } from '../constants/router/paths';
import { MENSAJES_NEGOCIO } from '../constants/messages/business-messages';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router) { }

  public form: FormGroup;

  ngOnInit(): void {

  }

  public get formulario() {
    return this.form.controls;
  }

  public get mensaje() {
    return MENSAJES_NEGOCIO;
  }

  public get navegacion() {
    return PATHS;
  }

  public trackByFunc(i, item): number {
    return item.id;
  }

  public alertOptions(autoClose?: boolean, keepAfterRouteChange?: boolean, scroll?: boolean) {
    let alertOptions = {
      autoClose: autoClose,
      keepAfterRouteChange: keepAfterRouteChange,
      scroll: scroll
    };
    return alertOptions;
  }

}
