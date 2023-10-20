import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FiltroIncapacidadDetalle } from 'src/app/models/incapacidad/filtro-incapacidad-detalle';
import { Incapacidad } from 'src/app/models/incapacidad/incapacidad';
import { ModelIncapacidadDetalle } from 'src/app/models/incapacidad/model-incapacidad-detalle';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { IncapacidadService } from 'src/app/services/incapacidades/incapacidad.service';
import { ParentComponent } from '../../shared/parent/parent.component';


@Component({
  selector: 'app-incapacidad-detalle',
  templateUrl: './incapacidad-detalle.component.html',
  styleUrls: ['./incapacidad-detalle.component.css']
})
export class IncapacidadDetalleComponent extends ParentComponent implements OnInit {

  @Input() idee: string;
  @Input() ideeFecha: string;
  @Input() folio: string;
  @Input() edadDetalle: number;
  @Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();
  

  public pageRequest: PageRequest<FiltroIncapacidadDetalle> = new PageRequest<FiltroIncapacidadDetalle>();
  public modelIncapacidadDetalle: ModelIncapacidadDetalle = new ModelIncapacidadDetalle();
  public offset: number = 0;
  public dateHeaderParsed: string;
  public incapacidad: Incapacidad;
  public actualIndex: number = 1;
  public paginatorFirstIndex: number = 0;

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private incapacidadService: IncapacidadService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  ngOnInit(): void {
    this.getDetalleIncapacidad(this.actualIndex);
    // this.edadDetalleEvent.emit(this.edadDetalle);
  }

  public getDetalleIncapacidad(page: number) {
    
    this.actualIndex = page;
    this.paginatorFirstIndex = page -1;

    this.spinner.show();

    let filtroIncapacidadDetalle = new FiltroIncapacidadDetalle();

    filtroIncapacidadDetalle.idee = this.idee;
    filtroIncapacidadDetalle.ideeFecha = this.ideeFecha;

    this.modelIncapacidadDetalle.model = filtroIncapacidadDetalle;

    this.incapacidadService.getIncapacidadDetalle(this.modelIncapacidadDetalle)
      .subscribe(resp => {
        this.spinner.hide();
        this.incapacidad = resp.body;
        if(!this.incapacidad) return;
        moment.locale('es');
        const dateHeader = moment(this.incapacidad.fecha, 'DD/MM/YYYY h:mm a');
        this.dateHeaderParsed = dateHeader.format('dddd DD [de]') + ' ' +
                                dateHeader.format('MMMM')[0].toUpperCase() + dateHeader.format('MMMM').slice(1).toLowerCase() + ' ' +
                                dateHeader.format('[del] YYYY HH:mm:ss');
      }
    );
  }


}
