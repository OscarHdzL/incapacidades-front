import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contrareferencia } from 'src/app/models/contrareferencia/contrareferencia';
import { FiltroContrareferencia } from 'src/app/models/contrareferencia/filtro-contrareferencia';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { ContrareferenciaService } from 'src/app/services/contrareferencia/contrareferencia.service';
import { ParentComponent } from '../../shared/parent/parent.component';

@Component({
  selector: 'app-contrareferencia',
  templateUrl: './contrareferencia.component.html',
  styleUrls: ['./contrareferencia.component.css']
})

export class ContrareferenciaComponent extends ParentComponent implements OnInit {

  @Input() idee: string;
  @Input() ideeFecha: string;

  public pageRequest: PageRequest<FiltroContrareferencia> = new PageRequest<FiltroContrareferencia>();
  public modelReferencia: FiltroContrareferencia = new FiltroContrareferencia();
  public contrarreferencias: Page<Contrareferencia> = new Page<Contrareferencia>();
  public offset: number = 0;
  public dateHeaderParsed: string;
  public contrareferencia: Contrareferencia;
  public actualIndex: number = 1;
  public paginatorFirstIndex: number = 0;

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private contrareferenciaService: ContrareferenciaService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  ngOnInit(): void {
    this.getDetalleContrareferencia(this.actualIndex);
  }

  public getPagerContrarreferencias(event){
    this.getDetalleContrareferencia(event.page + 1);
  }

  public getDetalleContrareferencia(page: number) {

    if((page > this.contrarreferencias.totalElements) || (page <= 0)){
      return;
    }

    this.actualIndex = page;
    this.paginatorFirstIndex = page -1;

    this.spinner.show();

    this.pageRequest.page = page;
    this.pageRequest.pageSize = 1;
    this.pageRequest.order = "unidadDestino";
    this.pageRequest.desc = true;

    this.modelReferencia.idee = this.idee;
    this.modelReferencia.ideeFecha = this.ideeFecha;
    this.pageRequest.model = this.modelReferencia;

    this.contrareferenciaService.getContrareferencias(this.pageRequest)
      .subscribe(resp => {
        this.spinner.hide();
        this.contrarreferencias = resp.body;
        this.contrareferencia = resp.body.content;
        if(!this.contrareferencia) return;
        moment.locale('es');
        const dateHeader = moment(this.contrareferencia.fechaAltaServicio, 'DD/MM/YYYY h:mm a');
        this.dateHeaderParsed = dateHeader.format('dddd DD [de]') + ' ' +
                                dateHeader.format('MMMM')[0].toUpperCase() + dateHeader.format('MMMM').slice(1).toLowerCase() + ' ' +
                                dateHeader.format('[del] YYYY HH:mm:ss');
      }
    );
  }

}
