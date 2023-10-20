import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/modules/authentication/login/login.component";
import { BusquedaAvanzadaComponent } from "src/app/modules/busqueda-nss/busqueda-avanzada/busqueda-avanzada.component";
import { BusquedaComponent } from "src/app/modules/busqueda-nss/busqueda/busqueda.component";
import { ContenedorCronologiaComponent } from "src/app/modules/cronologia/contenedor-cronologia/contenedor-cronologia.component";
import { LaboratorioComponent } from "src/app/modules/cronologia/laboratorio/laboratorio.component";
import { RouteInterceptorComponent } from "../../route-interceptor/route-interceptor.component";
import { AutenticacionGuard } from "../../security/authentication-guard";
import { PATHS } from "./paths";

import { NotaPostquirurgicaComponent } from "src/app/modules/cronologia/Cirugia/nota-postquirurgica/nota-postquirurgica.component";
import { NotaInicialUrgenciasComponent } from "src/app/modules/cronologia/urgencias/nota-inicial-urgencias/nota-inicial-urgencias.component";
import { IncapacidadDetailComponent } from "src/app/modules/cronologia/incapacidad-detail/incapacidad-detail.component";
import { NotaMedicaDetalleComponent } from "src/app/modules/cronologia/nota-medica-detalle/nota-medica-detalle.component";
import { NotaMedicaInicialComponent } from "src/app/modules/cronologia/nota-medica-detalle-hospitalizacion/hospitalizacion/nota-medica-inicial/nota-medica-inicial.component";
import { NotaEgresoComponent } from "src/app/modules/cronologia/nota-medica-detalle-hospitalizacion/hospitalizacion/nota-egreso/nota-egreso.component";
import { NotaEvolucionComponent } from "src/app/modules/cronologia/nota-medica-detalle-hospitalizacion/hospitalizacion/nota-evolucion/nota-evolucion.component";
import { NotaMedicaInicialGinecoobstetriciaComponent } from "src/app/modules/cronologia/nota-medica-detalle-hospitalizacion/hospitalizacion/nota-medica-inicial-ginecoobstetricia/nota-medica-inicial-ginecoobstetricia.component";
import { IncapacidadNuevoComponent } from "src/app/modules/cronologia/incapacidad-nuevo/incapacidad-nuevo.component";


export const routes: Routes = [
   {
      path: 'incapacidad',
      children : [{
         path: '**',
         component: IncapacidadNuevoComponent
     }]
   },{
      path: 'nota-detalle',
      children : [{
         path: '**',
         component: NotaMedicaDetalleComponent
     }]
   },
   {
      path: 'incapacidad-detail',
      children : [{
         path: '**',
         component: IncapacidadDetailComponent
     }]
   },
   {
      path: 'inicial',
      children : [{
         path: '**',
         component: NotaMedicaInicialComponent
     }]
   },
   {
      path: 'egreso',
      children : [{
         path: '**',
         component: NotaEgresoComponent
     }]
   },
   {
      path: 'evolucion',
      children : [{
         path: '**',
         component: NotaEvolucionComponent
     }]
   },
   {
      path: 'post',
      children : [{
         path: '**',
         component: NotaPostquirurgicaComponent
     }]
   },{
      path: 'gineco',
      children : [{
         path: '**',
         component: NotaMedicaInicialGinecoobstetriciaComponent
     }]
   },
   {
      path: 'inicial-urgencias',
      children : [{
         path: '**',
         component: NotaInicialUrgenciasComponent
     }]
   },
   {
      path: PATHS.login,
      pathMatch: 'full',
      component: LoginComponent
   },
   {
      path: PATHS.buscar,
      children : [{
         path: '**',
         component: RouteInterceptorComponent
     }]
   },
   {
      path: PATHS.busquedaNss,
      pathMatch: 'full',
      component: BusquedaComponent,
      canActivate: [AutenticacionGuard],
   },
   {
      path: PATHS.busquedaNssAvanzada,
      pathMatch: 'full',
      component: BusquedaAvanzadaComponent,
      //canActivate: [AutenticacionGuard],
   },
   {
      path: PATHS.cronologia,
      pathMatch: 'full',
      component: ContenedorCronologiaComponent,
      /* canActivate: [AutenticacionGuard], */
   },
   {
      path: PATHS.laboratorio,
      pathMatch: 'full',
      component: LaboratorioComponent,
      canActivate: [AutenticacionGuard],
   },
   {
      path: '',
      pathMatch: 'full',
      redirectTo: PATHS.login
   },
   {
      path: '**',
      redirectTo: PATHS.login
   }
]