import { DataService } from './../../../services/common/data/data.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fecha } from 'src/app/models/cronologia/nota-medica-detalle/fecha';
import { Ooad } from 'src/app/models/cronologia/ooad';
import { Unidad } from 'src/app/models/cronologia/unidad';
import { Diagnostico } from 'src/app/models/incapacidad/diagnostico';
import { FiltroIncapacidad } from 'src/app/models/incapacidad/filtro-incapacidad';

import { ResultadoIncapacidad } from 'src/app/models/incapacidad/resultado-incapacidad';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { IncapacidadService } from 'src/app/services/incapacidades/incapacidad.service';
import { ID_TIPO_CATALOGO } from '../../shared/constants/cronologia/catalogo';
import { ParentComponent } from '../../shared/parent/parent.component';
import { ID_MENU_HEADER } from '../../shared/constants/cronologia/header-menu';
import { FiltrosIncapacidad, IncapacidadRequest } from 'src/app/models/incapacidad/incapacidadRequest';
import { Delegaciones } from 'src/app/models/cronologia/delegaciones';
import { Unidades } from 'src/app/models/cronologia/unidades';
import { Diagnosticos } from 'src/app/models/cronologia/diagnosticos';

@Component({
  selector: 'app-incapacidad-nuevo',
  templateUrl: './incapacidad-nuevo.component.html',
  styleUrls: ['./incapacidad-nuevo.component.css']
})
export class IncapacidadNuevoComponent extends ParentComponent implements OnInit  {

	@Input() idee: string;

	@Output() menuSelectEvent : EventEmitter<number> = new EventEmitter<number>();
	@Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();
	@Output() incapacidadEvent: EventEmitter<string> = new EventEmitter<string>();

	public pageRequest: PageRequest<FiltrosIncapacidad> = new PageRequest<FiltrosIncapacidad>();
	public offset: number = 0;
	public ooads: Delegaciones[];
	public unidades: Unidades[];
	public resultadosIncapacidades: Page<ResultadoIncapacidad> = new Page<ResultadoIncapacidad>();
	// Verificar si se usa public diagnosticosTable: Page<EstudioTable> = new Page<EstudioTable>();
	public diagnosticos: Diagnosticos[];
	
	public modelIncapacidadRequest: IncapacidadRequest = new IncapacidadRequest();
	public filtroIncapacidad: FiltrosIncapacidad = new FiltrosIncapacidad();
	

//let a = new FiltroIncapacidad
	public incapacidad: string;

	constructor(protected formBuilder: FormBuilder,
		protected spinner: NgxSpinnerService,
		protected autenticacionService: AutenticacionService,
		protected router: Router,
		private incapacidadService: IncapacidadService,
		private cdRef: ChangeDetectorRef,
		private dataService: DataService
		) {
		super(formBuilder, spinner, autenticacionService, router);
	}

	@ViewChild('dateFilter') datePicker;
	@ViewChild('paginator') paginator;

/* 
Anterior
public arrayTable = [
		{ field: 'fecha', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'ooad', header: 'OOAD', subHeader: '', enabled: true },
		{ field: 'unidad', header: 'Unidad médica', subHeader: '', enabled: true },
		{ field: 'diagnostico', header: 'Diagnóstico', subHeader: '', enabled: true },
		{ field: 'fechaInicio', header: 'Fecha inicial', subHeader: '', enabled: true },
		{ field: 'fechaTermino', header: 'Fecha de término', subHeader: '', enabled: true },
		{ field: 'dropdown', header: 'dropdown' }
	]; */


	public arrayTable = [
		{ field: 'fecha_expedicion_string', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'delegacion_expedidora', header: 'OOAD', subHeader: '', enabled: true },
		{ field: 'unidad_expedidora', header: 'Unidad médica', subHeader: '', enabled: true },
		{ field: 'diagnostico', header: 'Diagnóstico', subHeader: '', enabled: true },
		{ field: 'fecha_inicio_string', header: 'Fecha inicial', subHeader: '', enabled: true },
		{ field: 'fecha_termino_string', header: 'Fecha de término', subHeader: '', enabled: true },
		{ field: 'dropdown', header: 'dropdown' }
	];

	public arraySubTable = [
		{ field: 'folio', header: 'Folio', subHeader: '', enabled: true },
		{ field: 'dias_autorizados', header: 'Días autorizados', subHeader: '', enabled: true },
		{ field: 'dias_probables_recuperacion', header: 'Días probables de recuperación', subHeader: '', enabled: true },
		{ field: 'dias_acumulados', header: 'Días acumulados', subHeader: '', enabled: true },
		{ field: 'ramo_seguro', header: 'Ramo de seguro', subHeader: '', enabled: true },
		{ field: 'tipo_incapacidad', header: 'Tipo de incapacidad', subHeader: '', enabled: true },
		{ field: 'ocupacion', header: 'Ocupación', subHeader: '', enabled: true },
		{ field: 'nombre_patron', header: 'Patrón', subHeader: '', enabled: true }
	];

	public arrayDiagnosticoTable = [
		{ field: 'fecha', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'prueba', header: 'Prueba', subHeader: '', enabled: true },
		{ field: 'resultados', header: 'Resultados', subHeader: '', enabled: true },
		{ field: 'unidadMedida', header: 'Unidad de medida', subHeader: '', enabled: true },
		{ field: 'valoresNormales', header: 'Valores normales', subHeader: '', enabled: true },
	];

	ngOnInit(): void {

		if (!this.idee) {
			return;
		}

		this.edadDetalleEvent.emit(undefined);
		this.createFormGroup();
		this.getOoads().then(() => {
			this.pageRequest.pageSize = 10;
			this.pageRequest.order = "fecha_expedicion";
			this.pageRequest.desc = true;
			this.getDiagnosticos();
		});
	}

	public createFormGroup() {
		this.form = this.formBuilder.group({
			fecNota: [''],
			idOoad: [''],
			idUnidad: [''],
			idDiagnostico: [''],
			date: ['']
		});
	}

	public selectedDates(event) {
		let day = event.getDate();
		let month = event.getMonth() + 1;
		let year = event.getFullYear();
		/* if (!this.filtroIncapacidad.fecha) {
			this.filtroIncapacidad.fecha = new Fecha();
		} */
		if (this.filtroIncapacidad.start && this.filtroIncapacidad.end) {
			this.filtroIncapacidad.start = '';
			this.filtroIncapacidad.end = '';
		}
		if (!this.filtroIncapacidad.start) {
			this.filtroIncapacidad.start = (day + '/' + month + '/' + year);
			return;
		}
		if (!this.filtroIncapacidad.end) {
			this.filtroIncapacidad.end = (day + '/' + month + '/' + year);
			this.datePicker.overlayVisible = false;
			this.getFilter();
			this.getDiagnosticos();
			this.getResultadosIncapacidades(1);
			this.paginator.changePage(0);
		}
	}

	public getPagerResultadosInacapacidad(event) {
		this.getResultadosIncapacidades(event.page + 1);
	}

	public clearDate() {
		this.filtroIncapacidad.start = undefined;
		this.filtroIncapacidad.end = undefined;
		this.getFilter();
		this.getDiagnosticos();
		this.getResultadosIncapacidades(1);
	}

	public clearIfNotEndDate(){
		if(this.filtroIncapacidad?.end && (this.filtroIncapacidad.end == '')){
			this.filtroIncapacidad.start = undefined;
			this.filtroIncapacidad.end = undefined;
			this.form.get('date').setValue(undefined);
		}
	}

	private async getOoads(): Promise<any> {
		this.getFilter();
		return new Promise((resolve) => {
			this.incapacidadService.getDatosPorFiltroNuevo(this.modelIncapacidadRequest, ID_TIPO_CATALOGO.ooads).subscribe(response => {
				
				this.ooads = response.body;
				this.pageRequest.order="fecha_expedicion";
				this.pageRequest.pageSize = 10;
				this.pageRequest.page = 1;
				this.pageRequest.desc = true;
				this.getResultadosIncapacidades(1);
				resolve(response);
			});
		});
	}

	public sortTable(header: any) {
		this.pageRequest.order = header.field;
		this.pageRequest.desc = !this.pageRequest.desc;
		this.getResultadosIncapacidades(1);
		this.paginator.changePage(0);
	}

	private getFilter() {

	//ANTERIOR
		
		let datosPaciente = this.dataService.getDatosPaciente();

		this.filtroIncapacidad.num_nss = datosPaciente.nss;
		this.filtroIncapacidad.agregado_medico = datosPaciente.agregadoMedico;

		if (!this.form.get('idOoad').value || this.form.get('idOoad').value == '') {
			//this.filtroIncapacidad.ooad = undefined;
			this.filtroIncapacidad.delegacion_expedidora = undefined;
		} else {
			//this.filtroIncapacidad.ooad = this.form.get('idOoad').value;
			this.filtroIncapacidad.delegacion_expedidora = this.form.get('idOoad').value;
		}

		if (!this.form.get('idUnidad').value || this.form.get('idUnidad').value == '') {
			//this.filtroIncapacidad.unidad = undefined;
			this.filtroIncapacidad.unidad_expedidora = undefined;
		} else {
			//this.filtroIncapacidad.unidad = this.form.get('idUnidad').value;
			this.filtroIncapacidad.unidad_expedidora = this.form.get('idUnidad').value;
		}

		if (!this.form.get('idDiagnostico').value || this.form.get('idDiagnostico').value == '') {
			this.filtroIncapacidad.diagnostico = undefined;
		} else {
			this.filtroIncapacidad.diagnostico = this.form.get('idDiagnostico').value;
		}

		this.modelIncapacidadRequest.model = this.filtroIncapacidad;
		
		
	}

	public getDiagnosticos() {
		this.getFilter();
		this.spinner.show();
		return new Promise((resolve) => {
			this.incapacidadService.getDatosPorFiltroNuevo(this.modelIncapacidadRequest, ID_TIPO_CATALOGO.diagnosticos).subscribe(response => {
				this.diagnosticos = response.body;
				this.spinner.hide();
				// this.getResultadosIncapacidades(1);
				resolve(response);
			});
		});
	}

	public ooadChange() {

		this.unidades = [];
		this.diagnosticos = [];
		this.form.get('idUnidad')?.reset('');
		this.form.get('idDiagnostico')?.reset('');
		this.getFilter();
		this.spinner.show();
		this.paginator?.changePage(0);

		return new Promise((resolve) => {
			this.incapacidadService.getDatosPorFiltroNuevo(this.modelIncapacidadRequest, ID_TIPO_CATALOGO.unidades).subscribe(response => {
				this.unidades = response.body;
				this.spinner.hide();

				this.getResultadosIncapacidades(1).then(() => {
					this.getDiagnosticos();
				});

				resolve(this.unidades);

			});
		});
	}

	public unidadChange() {
		this.form.get('idDiagnostico')?.reset('');
		this.getDiagnosticos();
		this.getResultadosIncapacidades(1);
	}

	public diagnosticoChange() {
		this.getFilter();
		this.getResultadosIncapacidades(1);
	}

	public async getResultadosIncapacidades(page: number): Promise<any> {





		this.spinner.show();

		this.getFilter();

		return new Promise((resolve) => {

			this.pageRequest.page = page;
			this.pageRequest.model = this.filtroIncapacidad;

			this.incapacidadService.getResultadosIncapacidadesNuevo(this.pageRequest)
				.subscribe(response => {
					
					
					if (this.form.get('idDiagnostico').value) {
						// this.estudiosTable = response.body;
						// this.estudiosTable.currentPage = page;
						this.resultadosIncapacidades = response.body;
						this.resultadosIncapacidades.currentPage = page;
					} else {
						this.resultadosIncapacidades = response.body;
						this.resultadosIncapacidades.currentPage = page;
					}

					if (!this.resultadosIncapacidades) {
						resolve(undefined);
					}
					this.spinner.hide();
					resolve(this.resultadosIncapacidades);


					/* let datosPaciente = this.dataService.getDatosPaciente();

					this.resultadosIncapacidades.content.forEach((incapacidad)=>{
						//this.incapacidadService.getIncapacidadDetailByFolio(incapacidad.info.folio)
						this.incapacidadService.getIncapacidadDetailByFolioNSSAgregadoMedico(incapacidad.info.folio, datosPaciente.nss, datosPaciente.agregadoMedico)
						.subscribe(resp => {
							
							if(!resp) return;
							
							incapacidad.info.ocupacion = resp.ocupacion;
							incapacidad.info.nombre_patron = resp.nombre_patron;
							
				  
						}
					  );
					}); */
				});
			this.offset = this.pageRequest.pageSize * (this.pageRequest.page - 1);
		});
	}

	
	public navigateDetail(incapacidad){
		
		this.incapacidad = incapacidad;
		this.incapacidadEvent.emit(this.incapacidad);
		this.menuSelectEvent.emit(ID_MENU_HEADER.incapacidadesDetail);
	  }

	  ngAfterViewChecked(): void {
		this.cdRef.detectChanges();
	  }

}
