import { DataService } from './../../../services/common/data/data.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
import { IncapacidadDetail } from 'src/app/models/incapacidad/incapacidad-detail';

@Component({
  selector: 'app-incapacidad-detail',
  templateUrl: './incapacidad-detail.component.html',
  styleUrls: ['./incapacidad-detail.component.css']
})
export class IncapacidadDetailComponent extends ParentComponent implements OnInit, OnDestroy {

  @Input() incapacidad_: any;
  //@Input() idee: string;
  //@Input() ideeFecha: string;
  //@Input() edadDetalle: number;
/*   @Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();
 */
  public pageRequest: PageRequest<FiltroIncapacidadDetalle> = new PageRequest<FiltroIncapacidadDetalle>();
  public modelIncapacidadDetalle: ModelIncapacidadDetalle = new ModelIncapacidadDetalle();
  public offset: number = 0;
  public dateHeaderParsed: string;
  public incapacidad: Incapacidad;
  public incapacidadDetail: IncapacidadDetail;
  public actualIndex: number = 1;
  public paginatorFirstIndex: number = 0;

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private incapacidadService: IncapacidadService,
    private dataService: DataService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  ngOnDestroy(): void {
   // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getDetalleIncapacidad(this.actualIndex);
    // this.edadDetalleEvent.emit(this.edadDetalle);
  }

  public getDetalleIncapacidad(page: number) {
    
    this.actualIndex = page;
    this.paginatorFirstIndex = page -1;

    this.spinner.show();

    let datosPaciente = this.dataService.getDatosPaciente();

    
    this.incapacidadService.getIncapacidadDetailByFolioNSSAgregadoMedico(this.incapacidad_.folio, datosPaciente.nss, datosPaciente.agregadoMedico)
      .subscribe(resp => {
        
        console.log('respuesta servicio: ', resp);
        this.spinner.hide();
        this.incapacidadDetail = resp;
        if(!this.incapacidadDetail) return;
        moment.locale('es');
        
        //const dateHeader = moment("2016-01-18T00:00:00.000+00:00", 'DD/MM/YYYY h:mm a');
        const dateHeader = moment(this.incapacidadDetail.fecha_expedicion, 'YYYY-MM-DD hh:mm:ss a');
        this.dateHeaderParsed = dateHeader.format('dddd DD [de]') + ' ' +
                                dateHeader.format('MMMM')[0].toUpperCase() + dateHeader.format('MMMM').slice(1).toLowerCase() + ' ' +
                                dateHeader.format('[del] YYYY HH:mm:ss');
        
        const fInicio = moment(this.incapacidadDetail.fecha_inicio, 'YYYY-MM-DD hh:mm:ss a');

        this.incapacidadDetail.dias_acumulados = this.incapacidad_.dias_acumulados;
        this.incapacidadDetail.fecha_inicio = fInicio.format('DD') + '-' + fInicio.format('MM')+ '-' + fInicio.format('YYYY')

        const fTermino = moment(this.incapacidadDetail.fecha_termino, 'YYYY-MM-DD hh:mm:ss a');
        this.incapacidadDetail.fecha_termino = fTermino.format('DD') + '-' + fTermino.format('MM')+ '-' + fTermino.format('YYYY')


      }
    );
  }


}
