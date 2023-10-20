import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FiltroSelect } from 'src/app/models/cronologia/filtro-select';
import { IndicadoresAuxiliares } from 'src/app/models/cronologia/indicadores-auxiliares';
import { NotaMedica } from 'src/app/models/cronologia/nota-medica';
import { DetalleNotaMedica } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica';
import { DetalleNotaMedicaRequest } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica-request';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { CronologiaService } from 'src/app/services/cronologia/cronologia.service';
import { ID_MENU_HEADER } from '../../shared/constants/cronologia/header-menu';
import { ParentComponent } from '../../shared/parent/parent.component';
import { TipoNotaHospitalizacion } from '../../shared/constants/cronologia/TipoNotaHospitalizacion';

@Component({
  selector: 'app-nota-medica-detalle-hospitalizacion',
  templateUrl: './nota-medica-detalle-hospitalizacion.component.html',
  styleUrls: ['./nota-medica-detalle-hospitalizacion.component.css']
})
export class NotaMedicaDetalleHospitalizacionComponent extends ParentComponent implements OnInit {

  @Input() idee: string;

  @Input() actualSubNotaIndex: number;

  @Input() actualNotaIndex: number;
  
  @Input() subNotaSeleccionada:any;

  @Input() subNotasMedicas:any[];

  @Input() notasMedicas: Page<NotaMedica> = new Page<NotaMedica>();

  @Input() idSubMenuNota: string;

  @Output() menuSelectEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output() submenuSelectEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output() notaIndexEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() ideeFechaEvent: EventEmitter<string> = new EventEmitter<string>();

  public pageRequest: PageRequest<FiltroSelect> = new PageRequest<FiltroSelect>();

  public detalleNotaMedica: DetalleNotaMedica;

  public model: FiltroSelect = new FiltroSelect();

  public offset: number = 0;

  public dateHeaderParsed: string;

  public ideeFecha: string;

  public indicadoresAuxiliares: IndicadoresAuxiliares = new IndicadoresAuxiliares();

  public idMenu: number;
  public indexActualSubnota: number;

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router, private dataService: DataService,
    private cronologiaService: CronologiaService) {
    super(formBuilder, spinner, autenticacionService, router);
   
  }

  ngOnDestroy(): void {
    
    // this.edadDetalleEvent.emit(undefined);
  }

  ngOnInit(): void {
    
    //SE MANTIENE EL CONSUMO DEL SERVICIO PARA OBTENER LA SOMATOMETRIA
    this.getDetalleNotaMedica(this.actualNotaIndex).then(() => {
    });

    
    console.log('SubmenuNota', this.idSubMenuNota);
    console.log('SubNotas', this.subNotasMedicas);
    console.log('SubNotaSeleccionada', this.subNotaSeleccionada);

    console.log('SubNotaSeleccionadaIndex', this.subNotasMedicas.indexOf(this.subNotaSeleccionada));

    this.indexActualSubnota = this.subNotasMedicas.indexOf(this.subNotaSeleccionada);

    switch(this.subNotaSeleccionada){
      case TipoNotaHospitalizacion.NotaInicial:
        this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaInicial);
        //this.idSubMenuNota = TipoNotaHospitalizacion.NotaInicial;
      break;
      case TipoNotaHospitalizacion.NotaEgreso:
        this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEgreso);
        //this.idSubMenuNota = TipoNotaHospitalizacion.NotaEgreso;
      break;
      case TipoNotaHospitalizacion.NotaEvolucion:
        this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEvolucion);
        //this.idSubMenuNota = TipoNotaHospitalizacion.NotaEvolucion;
      break;
  }

  }

  public async getDetalleNotaMedica(notaMedicaIndex: number): Promise<any> {

    return new Promise((resolve) => {

      if (this.validIndex(notaMedicaIndex)) {
        this.actualNotaIndex = notaMedicaIndex;
        this.notaIndexEvent.emit(this.actualNotaIndex);
      } else {
        return;
      }

      this.spinner.show();

      this.cronologiaService.getDetalleNotaMedica(this.fillDetalleRequest(notaMedicaIndex))
        .subscribe(resp => {
          this.spinner.hide();
          this.detalleNotaMedica = resp.body;
          this.detalleNotaMedica.notaMedicaParent = this.notasMedicas.content[notaMedicaIndex];
          this.ideeFecha = this.detalleNotaMedica.ideeFecha;
          this.edadDetalleEvent.emit(this.detalleNotaMedica.edadNota);
          this.ideeFechaEvent.emit(this.ideeFecha);
          moment.locale('es');
          
          const dateHeader = moment(this.detalleNotaMedica.notaMedicaParent.fecha, 'DD/MM/YYYY h:mm a');
          this.dateHeaderParsed = dateHeader.format('dddd DD [de]') + ' ' +
            dateHeader.format('MMMM')[0].toUpperCase() + dateHeader.format('MMMM').slice(1).toLowerCase() + ' ' +
            dateHeader.format('[del] YYYY HH:mm:ss');
          this.getIndicadores();
          resolve(this.detalleNotaMedica);
        }
        );
    });
  }



  notaAnterior(){
    
    this.indexActualSubnota = this.subNotasMedicas.indexOf(this.subNotaSeleccionada);

    if(this.indexSubnotaValido(this.indexActualSubnota - 1)){
      this.indexActualSubnota = this.indexActualSubnota - 1;
      this.subNotaSeleccionada = this.subNotasMedicas[this.indexActualSubnota];

      switch(this.subNotaSeleccionada){
        case TipoNotaHospitalizacion.NotaInicial:
          this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaInicial);
        break;
        case TipoNotaHospitalizacion.NotaEgreso:
          this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEgreso);
        break;
        case TipoNotaHospitalizacion.NotaEvolucion:
          this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEvolucion);
        break;
      }
    }

  }

  notaSiguiente(){
    this.indexActualSubnota = this.subNotasMedicas.indexOf(this.subNotaSeleccionada);

    if(this.indexSubnotaValido(this.indexActualSubnota+1)){
      this.indexActualSubnota = this.indexActualSubnota + 1;
      this.subNotaSeleccionada = this.subNotasMedicas[this.indexActualSubnota];

      switch(this.subNotaSeleccionada){
        case TipoNotaHospitalizacion.NotaInicial:
          this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaInicial);
        break;
        case TipoNotaHospitalizacion.NotaEgreso:
          this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEgreso);
        break;
        case TipoNotaHospitalizacion.NotaEvolucion:
          this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEvolucion);
        break;
      }
    }
  }


  indexSubnotaValido(index: number){

    if(index>=0 && index <= this.subNotasMedicas.length-1){
      return true;
    }

    return false;

  }


  private getIndicadores() {
    this.cronologiaService.getIndicadoresAuxiliares(this.idee, this.ideeFecha)
      .subscribe(resp => {
        this.spinner.hide();
        this.indicadoresAuxiliares = resp.body;
      }
      );
  }

  public validIndex(notaMedicaIndex: number): boolean {
    if (notaMedicaIndex >= 0 && notaMedicaIndex < this.notasMedicas.content.length) {
      return true;
    }
    return false;
  }

  private fillDetalleRequest(notaMedicaIndex: number): DetalleNotaMedicaRequest {
    let request: DetalleNotaMedicaRequest = new DetalleNotaMedicaRequest();
    request.ooad = this.notasMedicas.content[notaMedicaIndex].ooad;
    request.unidad = this.notasMedicas.content[notaMedicaIndex].unidad;
    request.fecha = this.notasMedicas.content[notaMedicaIndex].fecha;
    request.idee = this.idee;
    return request;
  }

/*   public navigation(recetaDetalleIndex: number) {
    this.recetaDetalleIndexEvent.emit(recetaDetalleIndex);
    this.detalleNotaMedica.idee = this.idee;
    this.recetaDetalleEvent.emit(this.detalleNotaMedica);
    this.menuSelectEvent.emit(ID_MENU_HEADER.recetaDetalle);
  } */

  public get idMenuConstant() {
    return ID_MENU_HEADER;
  }

  public get idSubMenuConstant() {
    return TipoNotaHospitalizacion;
  }

}
