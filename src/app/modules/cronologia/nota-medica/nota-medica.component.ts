import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/models/cronologia/especialidad';
import { FiltroSelect } from 'src/app/models/cronologia/filtro-select';
import { NotaMedica } from 'src/app/models/cronologia/nota-medica';
import { Fecha } from 'src/app/models/cronologia/nota-medica-detalle/fecha';
import { PageRequest } from 'src/app/models/cronologia/page-request';
import { Unidad } from 'src/app/models/cronologia/unidad';
import { Ooad } from 'src/app/models/cronologia/ooad';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { CronologiaService } from 'src/app/services/cronologia/cronologia.service';
import { ID_TIPO_CATALOGO } from '../../shared/constants/cronologia/catalogo';
import { ID_MENU_HEADER } from '../../shared/constants/cronologia/header-menu';
import { ParentComponent } from '../../shared/parent/parent.component';
import { DetalleNotaMedicaRequest } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica-request';
import { DetalleNotaMedica } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica';
import { IndicadoresAuxiliares } from 'src/app/models/cronologia/indicadores-auxiliares';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { Page } from 'src/app/models/pager/page';
import { TipoNotaHospitalizacion } from '../../shared/constants/cronologia/TipoNotaHospitalizacion';
import { SubNotaMedica } from 'src/app/models/cronologia/hospitalizacion/sub-nota-medica';
import { ID_SUBMENU_HEADER } from '../../shared/constants/cronologia/header-submenu';

@Component({
  selector: 'app-nota-medica',
  templateUrl: './nota-medica.component.html',
  styleUrls: ['./nota-medica.component.css']
})
export class NotaMedicaComponent extends ParentComponent implements OnInit {

  @Input() idee: string;

  @Output() menuSelectEvent : EventEmitter<number> = new EventEmitter<number>();
  @Output() submenuSelectEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output() idSubMenuNotaEvent : EventEmitter<number> = new EventEmitter<number>();

  @Output() ideeFechaEvent : EventEmitter<string> = new EventEmitter<string>();

  @Output() notaIndexEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output() notasMedicasEvent: EventEmitter<Page<NotaMedica>> = new EventEmitter<Page<NotaMedica>>();

  @Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();

  

  @Output() subNotaSeleccionadaEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() subNotasMedicasEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  

  public pageRequest: PageRequest<FiltroSelect> = new PageRequest<FiltroSelect>();
  public notasMedicas: Page<NotaMedica> = new Page<NotaMedica>();
  public model: FiltroSelect = new FiltroSelect();
  public offset: number = 0;
  public ooads: Ooad[];
	public unidades: Unidad[];
  public especialidades: Especialidad[];
  public indicadoresAuxiliares: IndicadoresAuxiliares = new IndicadoresAuxiliares();

  /* public idSubMenuNota: string; */

  public listaSubnotas : SubNotaMedica[]= [
    {
      fecha:"2023-01-01",
      especialidad:"Urología",
      diagnosticoPrincipal:"Alza térmica y hematuria",
      nota:"Nota médica inicial"
    },
    {
      fecha:"2023-01-20",
      especialidad:"Urología",
      diagnosticoPrincipal:"Dolor abdominal",
      nota:"Nota de evolucón"
    },
    {
      fecha:"2023-01-25",
      especialidad:"Urología",
      diagnosticoPrincipal:"Alza térmica y hematuria",
      nota:"Nota de egreso"
    }
  ]

  @ViewChild('dateFilter') datePicker;
  @ViewChild('paginator') paginator;

  public arrayTable = [
    {field:'fecha', header:'Fecha'},
    {field:'ooad', header:'OOAD'},
    {field:'unidad', header:'Unidad Médica'},
    {field:'especialidad', header:'Especialidad'},
    {field:'servicio', header:'Servicio'},
    {field:'nivel', header:'Nivel de atención'},
    {field:'diagnosticoPrincipal', header:'Diagnóstico principal'},
    {field:'referenciaMenu', header:'referenciaMenu'},
    { field: 'dropdown', header: 'dropdown' }
  ];

  public arraySubTable = [
		{ field: 'fecha', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'notas', header: 'Notas', subHeader: '', enabled: true },
		{ field: 'especialidad', header: 'Especialidad', subHeader: '', enabled: true },
		{ field: 'diagnostico_principal', header: 'Diagnostico principal', subHeader: '', enabled: true },
	];


  /* MODIFICAR LIMON */
/*   public arraySubTable = [
		{ field: 'folio', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'num_nss', header: 'Notas', subHeader: '', enabled: true },
		{ field: 'ramo_seguro', header: 'Especialidad', subHeader: '', enabled: true },
		{ field: 'diagnostico', header: 'Diagnostico principal', subHeader: '', enabled: true },
	]; */

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private cronologiaService: CronologiaService, private modalDialogService: ModalDialogService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  ngOnInit(): void {
    if (!this.idee) {
      return;
    }
    this.edadDetalleEvent.emit(undefined);
    this.createFormGroup();
    this.getOoads().then(() => {
      this.pageRequest.pageSize = 10;
      this.pageRequest.order = "fecha";
      this.pageRequest.desc = true;
      this.getNotasMedicas(1);
    });
  }

  public createFormGroup() {
		this.form = this.formBuilder.group({
			fecNota: [''],
			idOoad: [''],
			idUnidad: [''],
			idEspecialidad: [''],
      date: ['']
		});
	}

  public clearIfNotEndDate(){
		if(this.model?.fecha && (this.model.fecha.end == '')){
			this.model.fecha = undefined;
			this.form.get('date').setValue(undefined);
		}
	}

  private getOoads(): Promise<any> {
    this.getFilter();
    return new Promise((resolve) => {
      this.cronologiaService.getDatosPorFiltro(this.model, ID_TIPO_CATALOGO.ooads).subscribe(response => {
        this.ooads = response.body;
        resolve(response);
      });
    });
  }

  public navigateRef(idMenuConstant: number, notaMedicaIndex: number){
    this.spinner.show();

    this.cronologiaService.getDetalleNotaMedica(this.fillDetalleRequest(notaMedicaIndex))
      .subscribe(resp => {
        this.spinner.hide();
        let detalleNotaMedica: DetalleNotaMedica = resp.body;
        this.getIndicadores(detalleNotaMedica.ideeFecha).then(() => {
          switch (idMenuConstant) {
            case ID_MENU_HEADER.referencia:
              if(!this.indicadoresAuxiliares.existsReferences){
                const message = '<h2 style="color: #2b65f0;"><i class="icon-exclamation-sign"></i></h2><h4>La nota médica seleccionada no cuenta con referencias asociadas.</h4>';
                this.modalDialogService.showDialog('info', 'Información',
                  message, response => {
                    if (!response) {
                      return;
                    }
                    return;
                  });
                  return;
              }
              this.notaIndexEvent.emit(notaMedicaIndex);
              this.notasMedicasEvent.emit(this.notasMedicas);
              this.ideeFechaEvent.emit(detalleNotaMedica.ideeFecha);
              this.menuSelectEvent.emit(ID_MENU_HEADER.referencia);
              this.edadDetalleEvent.emit(detalleNotaMedica.edadNota);
              break;
            case ID_MENU_HEADER.contrareferencia:
              if(!this.indicadoresAuxiliares.existsContraReferences){
                const message = '<h2 style="color: #2b65f0;"><i class="icon-exclamation-sign"></i></h2><h4>La nota médica seleccionada no cuenta con contrarreferencias asociadas.</h4>';
                this.modalDialogService.showDialog('info', 'Información',
                  message, response => {
                    if (!response) {
                      return;
                    }
                    return;
                  });
                  return;
              } 
              this.notaIndexEvent.emit(notaMedicaIndex);
              this.notasMedicasEvent.emit(this.notasMedicas);
              this.ideeFechaEvent.emit(detalleNotaMedica.ideeFecha);
              this.menuSelectEvent.emit(ID_MENU_HEADER.contrareferencia);
              this.edadDetalleEvent.emit(detalleNotaMedica.edadNota);
              break;
            default:
              break;
          }
        })
      }
    );
  }

  private getIndicadores(ideeFecha: string): Promise<any>{
    return new Promise((resolve) => {
      this.cronologiaService.getIndicadoresAuxiliares(this.idee, ideeFecha)
        .subscribe(resp => {
          this.spinner.hide();
          this.indicadoresAuxiliares = resp.body;
          resolve(this.indicadoresAuxiliares);
        }
      );
    });
  }
  
  private fillDetalleRequest(notaMedicaIndex: number): DetalleNotaMedicaRequest {
    let request: DetalleNotaMedicaRequest = new DetalleNotaMedicaRequest();
    request.ooad = this.notasMedicas.content[notaMedicaIndex].ooad;
    request.unidad = this.notasMedicas.content[notaMedicaIndex].unidad;
    request.fecha = this.notasMedicas.content[notaMedicaIndex].fecha;
    request.idee = this.idee;
    return request;
  }

  public getNotasMedicas(page: number): Promise<any> {

    this.spinner.show();
    
    this.getFilter();
    
    return new Promise((resolve) => {

      this.pageRequest.page = page;
      this.pageRequest.model = this.model;

      this.cronologiaService.getNotasMedicas(this.pageRequest)
        .subscribe(response => {
          this.spinner.hide()
          this.notasMedicas = response.body;
          if(!this.notasMedicas){
            resolve(undefined);
            return;
          }
          this.notasMedicas.number = response.body.number - 1;
          this.notasMedicas.currentPage = page;

        /* simulacion de busqueda de sub notas */
        this.notasMedicas.content.forEach((nota)=>{
          /* this.cronologiaService.getNotaByFolio('VN840528').subscribe((resp)=>{
            nota.subNotasMedicas = [];
            nota.subNotasMedicas = resp;

            console.log('Respuesta recibida', nota);
          }); */
          nota.subNotasMedicas = this.listaSubnotas;
        })


          resolve(this.notasMedicas);
        });
      this.offset = this.pageRequest.pageSize * (this.pageRequest.page - 1);
    });
    
  }

  public ooadChange() {
    this.unidades = [];
    this.especialidades = [];
    this.form.get('idUnidad')?.reset('');
    this.form.get('idEspecialidad')?.reset('');
    this.getFilter();
    this.spinner.show();
    this.paginator.changePage(0);
    return new Promise((resolve) => {
      this.cronologiaService.getDatosPorFiltro(this.model, ID_TIPO_CATALOGO.unidades).subscribe(response => {
        this.unidades = response.body;
        this.spinner.hide();
        this.getNotasMedicas(1);
        resolve(this.unidades);
      });
    });
	}

	public unidadChange() {
    this.form.get('idEspecialidad')?.reset('');
    this.getFilter();
    this.spinner.show();
    this.paginator?.changePage(0)
    return new Promise((resolve) => {
      this.cronologiaService.getDatosPorFiltro(this.model, ID_TIPO_CATALOGO.especialidades).subscribe(response => {
        this.especialidades = response.body;
        this.spinner.hide();
        this.getNotasMedicas(1);
        resolve(this.especialidades);
      });
    });
	}

  public especialidadChange() {
    this.getFilter();
    this.getNotasMedicas(1);
    this.paginator.changePage(0);
  }

  public getPagerNotasMedicas(event){
    this.getNotasMedicas(event.page + 1);
  }

  public sortTable(header: any) {
    this.pageRequest.order = header.field;
    this.pageRequest.desc = !this.pageRequest.desc;
    this.getNotasMedicas(1);
    this.paginator.changePage(0)
  }

  private getFilter() {
    this.model.idee = this.idee;
    this.model.ooad = this.form.get('idOoad').value;
    this.model.unidad = this.form.get('idUnidad').value;
    this.model.especialidad = this.form.get('idEspecialidad').value;
    if(this.model?.fecha?.start && (this.model?.fecha?.end == '' || this.model?.fecha?.end == undefined)){
			this.model.fecha.end = this.model.fecha.start;
		}
  }

  public selectedDates(event){

    let day = event.getDate();
    let month = event.getMonth() + 1;
    let year = event.getFullYear();

    if(!this.model.fecha){
      this.model.fecha = new Fecha();
    }

    if(this.model.fecha.start && this.model.fecha.end){
      this.model.fecha.start = '';
      this.model.fecha.end = '';
    }

    if(!this.model.fecha.start){
      this.model.fecha.start = (day + '/' + month + '/' + year);
      return;
    }

    if(!this.model.fecha.end){
      this.model.fecha.end = (day + '/' + month + '/' + year);
      this.datePicker.overlayVisible = false;
      this.getFilter();
      this.getNotasMedicas(1);
      this.paginator.changePage(0);
    }

  }

  public clearDate(){
    this.model.fecha = undefined;
    this.getFilter();
    this.getNotasMedicas(1);
  }

  public navigateDetail(notaIndex: number){
    this.menuSelectEvent.emit(ID_MENU_HEADER.notaMedicaDetalle);
    this.notaIndexEvent.emit(notaIndex);
    this.notasMedicasEvent.emit(this.notasMedicas);
  }

  public get idMenuConstant() {
    return ID_MENU_HEADER;
  }

  public get idSubMenuConstant() {
    return TipoNotaHospitalizacion;
  }

  public navigateNota(nota: any, subnota: any, subNotasMedicas: any){

    

    switch(subnota.nota){
        case TipoNotaHospitalizacion.NotaInicial:
          //this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaInicial);
          this.idSubMenuNotaEvent.emit(ID_SUBMENU_HEADER.notaInicialHospitalizacion);
        break;
        case TipoNotaHospitalizacion.NotaEgreso:
          //this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEgreso);
          this.idSubMenuNotaEvent.emit(ID_SUBMENU_HEADER.notaEgresoHospitalizacion);
        break;
        case TipoNotaHospitalizacion.NotaEvolucion:
          //this.submenuSelectEvent.emit(this.idSubMenuConstant.NotaEvolucion);
          this.idSubMenuNotaEvent.emit(ID_SUBMENU_HEADER.notaEvolucionHospitalizacion);
          
        break;
    }
    this.menuSelectEvent.emit(ID_MENU_HEADER.notaMedicaDetalleHospitalizacion);
    this.notaIndexEvent.emit(this.notasMedicas.content.indexOf(nota));
    this.notasMedicasEvent.emit(this.notasMedicas);
    this.subNotaSeleccionadaEvent.emit(subnota);
    this.subNotasMedicasEvent.emit(subNotasMedicas);
  }

}
