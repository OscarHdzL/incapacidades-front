import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bitacora } from 'src/app/models/cronologia/bitacora';
import { NotaMedica } from 'src/app/models/cronologia/nota-medica';
import { DetalleNotaMedica } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica';
import { Paciente } from 'src/app/models/data/paciente';
import { Page } from 'src/app/models/pager/page';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { CronologiaService } from 'src/app/services/cronologia/cronologia.service';
import { ID_MENU_HEADER } from '../../shared/constants/cronologia/header-menu';
import { EVENTO, ORIGEN } from '../../shared/constants/cronologia/origen';
import { PATHS } from '../../shared/constants/router/paths';
import { ParentComponent } from '../../shared/parent/parent.component';

@Component({
  selector: 'app-contenedor-cronologia',
  templateUrl: './contenedor-cronologia.component.html',
  styleUrls: ['./contenedor-cronologia.component.css']
})
export class ContenedorCronologiaComponent extends ParentComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router, private dataService: DataService,
    private cronologiaService: CronologiaService, private cdRef: ChangeDetectorRef) {
    super(formBuilder, spinner, autenticacionService, router);
    try {
      
      if (this.router.getCurrentNavigation().extras.state.paciente){
        /* Vengo de búsquedaNss */
        this.storePaciente(this.router.getCurrentNavigation().extras.state.paciente);
        this.idee = this.router.getCurrentNavigation().extras.state.paciente.idee;
        this.idMenu = ID_MENU_HEADER.notaMedica;
      }
    } catch (error) { 
      /* Vengo de flujo de servicio externo */
    }
  }

  public idee: string = undefined;
  public ideeFecha: string = undefined;

  public incapacidad: any = undefined;
  public idSubMenuNota: number = undefined;
  public idMenu: number;
  public notaIndex: number
  public notasMedicas: Page<NotaMedica> = new Page<NotaMedica>();
  public subNotasMedicas: any[] = [];
  public subNotaSeleccionada: any;
  public detalleNotaMedica: DetalleNotaMedica = new DetalleNotaMedica();
  public edadDetalle: number;
  public datosPaciente: boolean = false;

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    
      /* Valido si me invoca servicio externo, si no lo regreso a búsqueda */
      if (this.model?.paciente?.idee) {
        this.idee = this.model?.paciente?.idee;
        this.idMenu = ID_MENU_HEADER.notaMedica;
        this.spinner.show();
        this.registrarBitacora().then(() => {
          this.spinner.hide();
          return;
        });
        this.spinner.hide();
      }else{
        //this.router.navigate([PATHS.login]);
      }
  }

  private async registrarBitacora(): Promise<any> {
    return new Promise((resolve) => {
      const bitacora: Bitacora = new Bitacora(this.model.bitacora);
      bitacora.sistema = this.model.bitacora.sub ? this.model.bitacora.sub.toUpperCase().toUpperCase():ORIGEN.VISOR.toUpperCase();
      bitacora.idee = this.model.paciente.idee;
      bitacora.agregadoMedico = this.model.paciente.agregadoMedico;
      bitacora.nss = this.model.paciente.nss;
      bitacora.cvePresupuestalAdscripcion = this.model.paciente.cvePresupuestalAdscripcion;
      if(this.autenticacionService.indBusquedaNSS){
        bitacora.evento = EVENTO.BUSQUEDA_NSS;
      }else{
        bitacora.evento = EVENTO.CRONOLOGIA;
      }
      this.cronologiaService.postBitacora(bitacora).subscribe(response => {
        this.spinner.hide();
        resolve(response);
      });
    });
  }

  get model() {
    return this.dataService.getModel();
  }

  private storePaciente(paciente: Paciente) {
    return this.dataService.storePaciente(paciente);
  }

  public menuSelectEvent(selectedMenu: number) {
    
    this.idMenu = selectedMenu;
  }

  public notaIndexEvent(notaIndex: number) {
    this.notaIndex = notaIndex;
  }

  public ideeFechaEvent(ideeFecha: string) {
    this.ideeFecha = ideeFecha;
  }

  public notasMedicasEvent(notasMedicas: Page<NotaMedica>) {
    this.notasMedicas = notasMedicas;
  }


  public subNotasMedicasEvent(subNotasMedicas_: any) {
    this.subNotasMedicas = subNotasMedicas_;
  }

  public subNotaSeleccionadaEvent(subNotaMedica_: any) {
    this.subNotaSeleccionada = subNotaMedica_;
  }

  public recetaDetalleEvent(detalleNotaMedica: DetalleNotaMedica) {
    this.detalleNotaMedica = detalleNotaMedica;
  }

  public edadDetalleEvent(edadDetalle: number) {
    this.edadDetalle = edadDetalle;
  }

  public incapacidadEvent(incapacidad_: string) {
    
    this.incapacidad = incapacidad_;
  }

  public idSubMenuNotaEvent(IdSubMenuNota_: number) {
    
    this.idSubMenuNota = IdSubMenuNota_;
  }

  public datosPacienteEvent(datosPaciente: boolean) {
    this.datosPaciente = datosPaciente;
  }

  public get idMenuConstant() {
    return ID_MENU_HEADER;
  }

}
