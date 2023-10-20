import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { FiltroReferencia } from 'src/app/models/referencia/filtro-referencia';
import { Referencia } from 'src/app/models/referencia/referencia';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { ReferenciaService } from 'src/app/services/referencia/referencia.service';
import { ParentComponent } from '../../shared/parent/parent.component';


@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styleUrls: ['./referencia.component.css']
})
export class ReferenciaComponent extends ParentComponent implements OnInit {

  @Input() idee: string;
  @Input() ideeFecha: string;
  @Input() edadDetalle: number;
  @Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();

  public pageRequest: PageRequest<FiltroReferencia> = new PageRequest<FiltroReferencia>();
  public modelReferencia: FiltroReferencia = new FiltroReferencia();
  public referencias: Page<Referencia> = new Page<Referencia>();
  public offset: number = 0;
  public dateHeaderParsed: string;
  public referencia: Referencia;
  public actualIndex: number = 1;
  public paginatorFirstIndex: number = 0;

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private referenciaService: ReferenciaService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  ngOnInit(): void {
    this.getDetalleReferencia(this.actualIndex);
    this.edadDetalleEvent.emit(this.edadDetalle);
  }

  public getPagerReferencias(event){
    this.getDetalleReferencia(event.page + 1);
  }

  public getDetalleReferencia(page: number) {
    
    if((page > this.referencias.totalElements) || (page <= 0)){
      return;
    }


    this.actualIndex = page;
    this.paginatorFirstIndex = page -1;

    this.spinner.show();

    this.pageRequest.page = page;
    this.pageRequest.pageSize = 1;
    this.pageRequest.order = "especialidadEnvia";
    this.pageRequest.desc = true;

    this.modelReferencia.idee = this.idee;
    this.modelReferencia.ideeFecha = this.ideeFecha;
    this.pageRequest.model = this.modelReferencia;

    this.referenciaService.getReferencias(this.pageRequest)
      .subscribe(resp => {
        this.spinner.hide();
        this.referencias = resp.body;
        this.referencia = resp.body.content;
        if(!this.referencia) return;
        moment.locale('es');
        const dateHeader = moment(this.referencia.fecha, 'DD/MM/YYYY h:mm a');
        this.dateHeaderParsed = dateHeader.format('dddd DD [de]') + ' ' +
                                dateHeader.format('MMMM')[0].toUpperCase() + dateHeader.format('MMMM').slice(1).toLowerCase() + ' ' +
                                dateHeader.format('[del] YYYY HH:mm:ss');
      }
    );
  }

}
