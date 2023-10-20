import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BusquedaAvanzadaComponent } from './busqueda-avanzada/busqueda-avanzada.component';



@NgModule({
  declarations: [
    BusquedaComponent,
    BusquedaAvanzadaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BusquedaNssModule { }
