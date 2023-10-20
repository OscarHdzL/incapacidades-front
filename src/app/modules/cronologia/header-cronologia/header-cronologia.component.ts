import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DatosPaciente } from 'src/app/models/cronologia/datos-paciente';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { CronologiaService } from 'src/app/services/cronologia/cronologia.service';
import { ApopService } from 'src/app/services/external/apop.service';
import { ID_MENU_HEADER } from '../../shared/constants/cronologia/header-menu';
import { MENU_HEADER_LABELS } from '../../shared/constants/cronologia/header-menu-labels';
import { PATHS } from '../../shared/constants/router/paths';
import { FujiService } from 'src/app/services/external/fuji.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { ID_SUBMENU_HEADER } from '../../shared/constants/cronologia/header-submenu';
import { SUB_MENU_HEADER_LABELS } from '../../shared/constants/cronologia/header-submenu-labels';

@Component({
  selector: 'app-header-cronologia',
  templateUrl: './header-cronologia.component.html',
  styleUrls: ['./header-cronologia.component.css']
})
export class HeaderCronologiaComponent implements OnInit, OnChanges {

  constructor(private cronologiaService: CronologiaService, private router: Router, private modalDialogService: ModalDialogService,
    private autenticacionService: AutenticacionService, private apopService: ApopService, private fujiService: FujiService,
    private dataService: DataService,
    ) { }

  @Input() idee: string;

  @Input() idMenu: number;
  
  @Input() idSubMenuNota: number;

  @Input() edadDetalle: string;

  @Output() menuSelectEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output() datosPacienteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public datosPaciente: DatosPaciente;

  ngOnInit(): void {
    if (!this.idee) {
      return;
    }
    this.getDatosPaciente();
  }

  ngOnChanges(changes: SimpleChanges): void { }

  private async getDatosPaciente(): Promise<any> {
    return new Promise((resolve) => {
      this.cronologiaService.getDatosPaciente(this.idee).subscribe((response: any) => {
        this.datosPaciente = new DatosPaciente(response.body);
        this.dataService.storeDatosPaciente(this.datosPaciente);
        if (response.status == 204) {
          this.datosPacienteEvent.emit(false);
          const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><label>La pantalla volverá al inicio</label><h4>El paciente no se encuentra en el Historial clínico</h4>';
          this.modalDialogService.showDialog('info', 'Su solicitud no pudo realizarse',
            message, response => {
              if (!response) {
                return;
              }
              return this.router.navigate([PATHS.login]);
            });
        }
        this.datosPacienteEvent.emit(true);
        resolve(this.datosPaciente);
      });
    });
  }

  public get idMenuConstant() {
    return ID_MENU_HEADER;
  }

  public get getMenuLabel() {
    return MENU_HEADER_LABELS;
  }

  public get idSubMenuConstant() {
    return ID_SUBMENU_HEADER;
  }

  public get getSubMenuLabel() {
    return SUB_MENU_HEADER_LABELS;
  }

  public get indBusquedaNSS() {
    return this.autenticacionService.indBusquedaNSS;
  }

  public navigate() {
    switch (this.idMenu) {
      case ID_MENU_HEADER.notaMedicaDetalle:
        this.selectedMenu(ID_MENU_HEADER.notaMedica);
        break;
      case ID_MENU_HEADER.notaMedica:
        if(this.autenticacionService.indBusquedaAvanzada){
          this.router.navigate([PATHS.busquedaNssAvanzada]);
        } else {
          this.router.navigate([PATHS.busquedaNss]);
        }
        break;
      case ID_MENU_HEADER.receta:
        this.selectedMenu(this.idMenu = ID_MENU_HEADER.notaMedica);
        break;
      case ID_MENU_HEADER.laboratorio:
        this.selectedMenu(ID_MENU_HEADER.notaMedica);
        break;
      case ID_MENU_HEADER.recetaDetalle:
        this.selectedMenu(ID_MENU_HEADER.notaMedicaDetalle);
        break;
      case ID_MENU_HEADER.referencia:
        this.selectedMenu(ID_MENU_HEADER.notaMedicaDetalle);
        break;
      case ID_MENU_HEADER.contrareferencia:
        this.selectedMenu(ID_MENU_HEADER.notaMedicaDetalle);
        break;
      case ID_MENU_HEADER.incapacidades:
        this.selectedMenu(ID_MENU_HEADER.notaMedica);
        break;
      case ID_MENU_HEADER.incapacidadesDetalle:
        this.selectedMenu(ID_MENU_HEADER.notaMedicaDetalle);
        break;
      case ID_MENU_HEADER.carnetAPOInterno:
        this.selectedMenu(ID_MENU_HEADER.notaMedica);
        break;

        //RETORNO DE NOTA MEDICA HOSPITALIZACION
      case ID_MENU_HEADER.notaMedicaDetalleHospitalizacion:
        this.selectedMenu(ID_MENU_HEADER.notaMedica);
      break;
        
      //incapacidad-detail
      case ID_MENU_HEADER.incapacidadesDetail:
        this.selectedMenu(ID_MENU_HEADER.incapacidades);
        break;

      default:
        break;
    }
  }

  public goFuji(){
    this.fujiService.getURI(this.idee).subscribe(response => {
      window.open(response.body, '_blank');
    });
  }

  public selectedMenu(idMenu: number) {
    this.menuSelectEvent.emit(idMenu);
  }

  public loadApopCarnet() {

    class TokenApop {
      access_token: string;
      cveIdee: string;
    }

    let token: TokenApop = new TokenApop();

    this.apopService.getToken().subscribe((response: any) => {
      if (response) {
        token.access_token = response.access_token;
        token.cveIdee = this.idee;
      }
      window.open(this.getEnviroment() + '/landing/' + encodeURI(JSON.stringify(token)), '_blank');
    })

  }

  private getEnviroment(): string {
    let url = document.location.href;
    if(url.includes('localhost') || url.includes('-qa')){
      return 'https://guiapop-visorcarnet-qa.cloudapps.imss.gob.mx'
    } else if(url.includes('-uat')){
      return 'https://guiapop-visorcarnet-uat.cloudapps.imss.gob.mx'
    }else{
      return ''
    }
  }

  private storeDatosPaciente(paciente: DatosPaciente) {
    return this.dataService.storeDatosPaciente(paciente);
  }
}
