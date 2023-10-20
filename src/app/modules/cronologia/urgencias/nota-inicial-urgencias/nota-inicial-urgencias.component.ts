import { FiltroSelect } from 'src/app/models/cronologia/filtro-select';
import { IndicadoresAuxiliares } from 'src/app/models/cronologia/indicadores-auxiliares';
import { NotaMedica } from 'src/app/models/cronologia/nota-medica';
import { DetalleNotaMedica } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { TabAntecedentes } from 'src/app/modules/shared/constants/cronologia/TabAntecedentes';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-nota-inicial-urgencias',
  templateUrl: './nota-inicial-urgencias.component.html',
  styleUrls: ['./nota-inicial-urgencias.component.css']
})
export class NotaInicialUrgenciasComponent implements OnInit {

  public indicadoresAuxiliares: IndicadoresAuxiliares = new IndicadoresAuxiliares();

  public pageRequest: PageRequest<FiltroSelect> = new PageRequest<FiltroSelect>();

  public detalleNotaMedica: DetalleNotaMedica;
  public dateHeaderParsed: string;
  @Input() actualNotaIndex: number;
  @Input() notasMedicas: Page<NotaMedica> = new Page<NotaMedica>();

  public tabSeleccionado = 1;



  constructor() { }

  ngOnInit(): void {

    this.pageRequest.pageSize = 10;
    this.pageRequest.order = "fecha";
    this.pageRequest.desc = true;
    //DESCOMENTAR LIMON
 /*    this.getDetalleNotaMedica(this.actualNotaIndex).then(() => {
      //this.getIndicadores();
    }); */


        //ELIMINAR LIMON
    this.detalleNotaMedica = new DetalleNotaMedica();
    this.detalleNotaMedica.diagnosticos = [];

    this.detalleNotaMedica.somatometria = {estatura: "1.72 m", peso: "80", temperatura: "36°C", presionArterialdia: "120", presionArterialsis: "80", frecuenciaCardiaca: 90, frecuenciaRespiratoria:70, glucosa: 120, saturacion: 95};
    this.detalleNotaMedica.resumenClinico = "Resumen clinico";
    this.detalleNotaMedica.diagnosticos = [];
    this.detalleNotaMedica.procedimiento = [];
    this.detalleNotaMedica.exploracionFisica = "exploracion fisica";
    this.detalleNotaMedica.motivoParaNoRegistrarExploracionFisica = "motivo para no exploiracion";
    this.detalleNotaMedica.indicacionesAdicionales = "indicaciones adicionales";;
    this.detalleNotaMedica.lugarAccidente = "lugar accidente";
    this.detalleNotaMedica.medico = { nombre: "medico", cedulaProfesional : "cdul 132", matricula: "matricula 44"};
    this.detalleNotaMedica.ideeFecha = "2023-01-01T12:00:11";
    this.detalleNotaMedica.idee = "41";
    this.detalleNotaMedica.edadActual= 56;
    this.detalleNotaMedica.edadNota = 31;

  this.detalleNotaMedica.notaMedicaParent = {unidad:"Unidad", fecha: "2023-01-01T12:00:11", especialidad:"especialidad"};
  }

  public validIndex(notaMedicaIndex: number): boolean {
    if (notaMedicaIndex >= 0 && notaMedicaIndex < this.notasMedicas.content.length) {
      return true;
    }
    return false;
  }

  public changeTabSelected(tab: number){

    switch(tab){
        case TabAntecedentes.AntecendentesPatologicos:
          this.tabSeleccionado = TabAntecedentes.AntecendentesPatologicos;
        break;
        case TabAntecedentes.AntecendentesGinecoObstetricos:
          this.tabSeleccionado = TabAntecedentes.AntecendentesGinecoObstetricos;
        break;
        case TabAntecedentes.OtrosAntecendentesPatologicos:
          this.tabSeleccionado = TabAntecedentes.OtrosAntecendentesPatologicos;
        break;
        case TabAntecedentes.OtrosAntecendentesGinecoObstetricos:
          this.tabSeleccionado = TabAntecedentes.OtrosAntecendentesGinecoObstetricos;
        break;
        case TabAntecedentes.PadecimientoActual:
          this.tabSeleccionado = TabAntecedentes.PadecimientoActual;
        break;
        case TabAntecedentes.DatosObstetricos:
          this.tabSeleccionado = TabAntecedentes.DatosObstetricos;
        break;
        default:
          this.tabSeleccionado = TabAntecedentes.AntecendentesPatologicos;
        break;
    }

  }

  get TabAntecedentes() {
    return TabAntecedentes;
  }
  
  public async getDetalleNotaMedica(notaMedicaIndex: number): Promise<any> {

    return new Promise((resolve) => {

     /*  if (this.validIndex(notaMedicaIndex)) {
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
        );*/
    }); 
  }
}

