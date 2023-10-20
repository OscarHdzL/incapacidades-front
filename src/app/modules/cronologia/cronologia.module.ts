import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NotaMedicaComponent } from './nota-medica/nota-medica.component';
import { NotaMedicaDetalleComponent } from './nota-medica-detalle/nota-medica-detalle.component';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';
import { RecetaComponent } from './receta/receta.component';
import { ContenedorCronologiaComponent } from './contenedor-cronologia/contenedor-cronologia.component';
import { HeaderCronologiaComponent } from './header-cronologia/header-cronologia.component';
import { RecetaDetalleComponent } from './receta-detalle/receta-detalle.component';
import { ReferenciaComponent } from './referencia/referencia.component';
import { ContrareferenciaComponent } from './contrareferencia/contrareferencia.component';
import { IncapacidadComponent } from './incapacidad/incapacidad.component';
import { IncapacidadDetalleComponent } from './incapacidad-detalle/incapacidad-detalle.component';
import { CarnetApoComponent } from './carnet-apo/carnet-apo.component';

import { NotaPostquirurgicaComponent } from './Cirugia/nota-postquirurgica/nota-postquirurgica.component';
import { NotaInicialUrgenciasComponent } from './urgencias/nota-inicial-urgencias/nota-inicial-urgencias.component';
import { NotaEgresoUrgenciasComponent } from './urgencias/nota-egreso-urgencias/nota-egreso-urgencias.component';
import { NotaMedicaDetalleHospitalizacionComponent } from './nota-medica-detalle-hospitalizacion/nota-medica-detalle-hospitalizacion.component';
import { IncapacidadDetailComponent } from './incapacidad-detail/incapacidad-detail.component';
import { NotaMedicaInicialGinecoobstetriciaComponent } from './nota-medica-detalle-hospitalizacion/hospitalizacion/nota-medica-inicial-ginecoobstetricia/nota-medica-inicial-ginecoobstetricia.component';
import { NotaMedicaInicialComponent } from './nota-medica-detalle-hospitalizacion/hospitalizacion/nota-medica-inicial/nota-medica-inicial.component';
import { NotaEvolucionComponent } from './nota-medica-detalle-hospitalizacion/hospitalizacion/nota-evolucion/nota-evolucion.component';
import { NotaEgresoComponent } from './nota-medica-detalle-hospitalizacion/hospitalizacion/nota-egreso/nota-egreso.component';
import { IncapacidadNuevoComponent } from './incapacidad-nuevo/incapacidad-nuevo.component';



@NgModule({
  declarations: [
    NotaMedicaComponent,
    NotaMedicaDetalleComponent,
    LaboratorioComponent,
    RecetaComponent,
    ContenedorCronologiaComponent,
    HeaderCronologiaComponent,
    RecetaDetalleComponent,
    ReferenciaComponent,
    ContrareferenciaComponent,
    IncapacidadComponent,
    IncapacidadDetalleComponent,
    CarnetApoComponent,
    NotaMedicaInicialGinecoobstetriciaComponent,
    NotaMedicaInicialComponent,
    NotaEvolucionComponent,
    NotaEgresoComponent,
    NotaPostquirurgicaComponent,
    NotaPostquirurgicaComponent,
    NotaInicialUrgenciasComponent,
    NotaEgresoUrgenciasComponent,
    NotaMedicaDetalleHospitalizacionComponent,
    NotaInicialUrgenciasComponent,
    IncapacidadDetailComponent,
    IncapacidadNuevoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CronologiaModule { }
