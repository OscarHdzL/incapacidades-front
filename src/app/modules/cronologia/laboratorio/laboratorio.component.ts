import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Unidad } from 'src/app/models/cronologia/unidad';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { ParentComponent } from '../../shared/parent/parent.component';
import { Page } from 'src/app/models/pager/page';
import { LaboratorioService } from 'src/app/services/laboratorio/laboratorio.service';
import { Fecha } from 'src/app/models/cronologia/nota-medica-detalle/fecha';
import { ResultadoLaboratorio } from 'src/app/models/laboratorio/resultado-laboratorio';
import { Ooad } from 'src/app/models/cronologia/ooad';
import { ID_TIPO_CATALOGO } from '../../shared/constants/cronologia/catalogo';
import { Estudio } from 'src/app/models/laboratorio/estudio';
import { FiltroLaboratorio } from 'src/app/models/laboratorio/filtro-laboratorio';
import { ModelLaboratorio } from 'src/app/models/laboratorio/model-laboratorio';
import { EstudioTable } from 'src/app/models/receta/estudio-table';
import { Prueba } from 'src/app/models/laboratorio/prueba';

@Component({
	selector: 'app-laboratorio',
	templateUrl: './laboratorio.component.html',
	styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent extends ParentComponent implements OnInit {

	@Input() idee: string;
	@Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();

	public pageRequest: PageRequest<FiltroLaboratorio> = new PageRequest<FiltroLaboratorio>();
	public offset: number = 0;
	public ooads: Ooad[];
	public unidades: Unidad[];
	public resultadosLaboratorio: Page<ResultadoLaboratorio> = new Page<ResultadoLaboratorio>();
	public estudiosTable: Page<EstudioTable> = new Page<EstudioTable>();
	public estudios: Estudio[];
	public pruebas: Prueba[];
	public modelLaboratorio: ModelLaboratorio = new ModelLaboratorio();
	public filtroLaboratorio: FiltroLaboratorio  = new FiltroLaboratorio();

	constructor(protected formBuilder: FormBuilder,
		protected spinner: NgxSpinnerService,
		protected autenticacionService: AutenticacionService,
		protected router: Router,
		private laboratorioService: LaboratorioService){
		super(formBuilder, spinner, autenticacionService, router);
	}

	@ViewChild('dateFilter') datePicker;
	@ViewChild('paginator') paginator;

	public arrayTable = [
		{ field: 'fecha', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'ooad', header: 'OOAD', subHeader: '', enabled: true },
		{ field: 'unidad', header: 'Unidad Médica', subHeader: '', enabled: true },
		{ field: 'folioOrden', header: 'Folio de orden', subHeader: '', enabled: true },
		{ field: 'dropdown', header: 'dropdown' }
	];

	public arraySubTable = [
		{ field: 'prueba', header: 'Prueba', subHeader: '', enabled: true },
		{ field: 'resultados', header: 'Resultados', subHeader: '', enabled: true },
		{ field: 'unidadMedida', header: 'Unidad de medida', subHeader: '', enabled: true },
		{ field: 'valoresNormales', header: 'Valores normales', subHeader: '', enabled: true }
	];

	public arrayEstudioTable = [
		{ field: 'fecha', header: 'Fecha', subHeader: '', enabled: true },
		{ field: 'prueba', header: 'Prueba', subHeader: '', enabled: true },
		{ field: 'resultados', header: 'Resultados', subHeader: '', enabled: true },
		{ field: 'unidadMedida', header: 'Unidad de medida', subHeader: '', enabled: true },
		{ field: 'valoresNormales', header: 'Valores normales', subHeader: '', enabled: true }
	];

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
			this.getResultadosLaboratorio(1).then(() => {
				this.getEstudios();
			});
		});
	}

	public createFormGroup() {
		this.form = this.formBuilder.group({
			fecNota: [''],
			idOoad: [''],
			idUnidad: [''],
			idEstudio: [''],
			idPrueba: [''],
			date: ['']
		});
	}

	public selectedDates(event) {
		let day = event.getDate();
		let month = event.getMonth() + 1;
		let year = event.getFullYear();
		if (!this.filtroLaboratorio.fecha) {
			this.filtroLaboratorio.fecha = new Fecha();
		}
		if (this.filtroLaboratorio.fecha.start && this.filtroLaboratorio.fecha.end) {
			this.filtroLaboratorio.fecha.start = '';
			this.filtroLaboratorio.fecha.end = '';
		}
		if (!this.filtroLaboratorio.fecha.start) {
			this.filtroLaboratorio.fecha.start = (day + '/' + month + '/' + year);
			return;
		}
		if (!this.filtroLaboratorio.fecha.end) {
			this.filtroLaboratorio.fecha.end = (day + '/' + month + '/' + year);
			this.datePicker.overlayVisible = false;
			this.getFilter();
			this.getEstudios();
			this.getResultadosLaboratorio(1);
			this.paginator.changePage(0);
		}
	}

	public ooadChange() {
		this.unidades = [];
		this.estudios = [];
		this.form.get('idUnidad')?.reset('');
		this.form.get('idEspecialidad')?.reset('');
		this.form.get('idEstudio')?.reset('');
		this.form.get('idPrueba')?.reset('');
		this.getFilter();
		this.spinner.show();
		this.paginator.changePage(0);
		return new Promise((resolve) => {
		  this.laboratorioService.getDatosPorFiltro(this.modelLaboratorio, ID_TIPO_CATALOGO.unidades).subscribe(response => {
			this.unidades = response.body.content;
			this.spinner.hide();
			// if(this.form.get('idOoad').value && this.form.get('idOoad').value != ''){
				this.getResultadosLaboratorio(1).then(() => {
					this.getEstudios();
				});
			// }
			resolve(this.unidades);
		  });
		});
	}

	public unidadChange(){
		this.form.get('idEspecialidad')?.reset('');
		this.form.get('idEstudio')?.reset('');
		this.form.get('idPrueba')?.reset('');
		this.getEstudios();
		this.getResultadosLaboratorio(1);
	}

	public estudioChange() {
		this.form.get('idPrueba')?.reset('');
		this.getFilter();
		this.getPruebas();
		this.getResultadosLaboratorio(1);
	}

	public clearIfNotEndDate(){
		if(this.filtroLaboratorio?.fecha && (this.filtroLaboratorio.fecha.end == '')){
			this.filtroLaboratorio.fecha = undefined;
			this.form.get('date').setValue(undefined);
		}
	}

	private async getOoads(): Promise<any> {
		this.getFilter();
		return new Promise((resolve) => {
			this.laboratorioService.getDatosPorFiltro(this.modelLaboratorio, ID_TIPO_CATALOGO.ooads).subscribe(response => {
				this.ooads = response.body.content;
				this.getEstudios();
				this.getResultadosLaboratorio(1);
				resolve(response);
			});
		});
	}

	public pruebaChange() {
		this.getFilter();
		this.getResultadosLaboratorio(1);
	}

	private getPruebas(){
		this.getFilter();
		this.spinner.show();
		return new Promise((resolve) => {
			this.laboratorioService.getDatosPorFiltro(this.modelLaboratorio, ID_TIPO_CATALOGO.pruebas).subscribe(response => {
			  this.pruebas = response.body.content;
			  this.spinner.hide();
			  if(this.form.get('idPrueba').value && this.form.get('idPrueba').value != ''){
				//   this.getResultadosLaboratorio(1);
			  }
			  resolve(this.estudios);
			});
		  });
	}

	public getEstudios() {
		this.getFilter();
		this.spinner.show();
		return new Promise((resolve) => {
		  this.laboratorioService.getDatosPorFiltro(this.modelLaboratorio, ID_TIPO_CATALOGO.estudios).subscribe(response => {
			this.estudios = response.body.content;
			this.spinner.hide();
			// if(this.form.get('idEstudio').value && this.form.get('idEstudio').value != ''){
			// 	this.getResultadosLaboratorio(1);
			// }
			resolve(this.estudios);
		  });
		});
	}

	public async getResultadosLaboratorio(page: number): Promise<any> {

		this.spinner.show();

		this.getFilter();

		return new Promise((resolve) => {

			this.pageRequest.page = page;
			this.pageRequest.model = this.filtroLaboratorio;

			this.laboratorioService.getResultadosLaboratorio(this.pageRequest)
				.subscribe(response => {
					this.spinner.hide();
					if(this.form.get('idPrueba').value){
						this.estudiosTable = response.body;
						this.estudiosTable.currentPage = page;
					}else{
						this.resultadosLaboratorio = response.body;
						this.resultadosLaboratorio.currentPage = page;
					}

					if (!this.resultadosLaboratorio) {
						resolve(undefined);
					}
					resolve(this.resultadosLaboratorio);
				});
			this.offset = this.pageRequest.pageSize * (this.pageRequest.page - 1);
		});
	}

	public getPagerResultadosLaboratorio(event) {
		this.getResultadosLaboratorio(event.page + 1);
	}

	private getFilter() {

		this.filtroLaboratorio.idee = this.idee;

		if (!this.form.get('idEstudio').value || this.form.get('idEstudio').value == '') {
			this.filtroLaboratorio.estudio = undefined;
		} else {
			this.filtroLaboratorio.estudio = this.form.get('idEstudio').value;
		}

		if (!this.form.get('idOoad').value || this.form.get('idOoad').value == '') {
			this.filtroLaboratorio.ooad = undefined;
		} else {
			this.filtroLaboratorio.ooad = this.form.get('idOoad').value;
		}

		if (!this.form.get('idUnidad').value || this.form.get('idUnidad').value == '') {
			this.filtroLaboratorio.unidad = undefined;
		} else {
			this.filtroLaboratorio.unidad = this.form.get('idUnidad').value;
		}

		if (!this.form.get('idPrueba').value || this.form.get('idPrueba').value == '') {
			this.filtroLaboratorio.prueba = undefined;
		} else {
			this.filtroLaboratorio.prueba = this.form.get('idPrueba').value;
		}

		if(this.filtroLaboratorio?.fecha?.start && (this.filtroLaboratorio?.fecha?.end == '' || this.filtroLaboratorio?.fecha?.end == undefined)){
			this.filtroLaboratorio.fecha.end = this.filtroLaboratorio.fecha.start;
		}

		this.modelLaboratorio.model = this.filtroLaboratorio;
	}

	public sortTable(header: any) {
		this.pageRequest.order = header.field;
		this.pageRequest.desc = !this.pageRequest.desc;
		this.getResultadosLaboratorio(1);
		this.paginator.changePage(0)
	}

	public navigateDetail(row: any) {
		// console.log(row);
	}

	public clearDate() {
		this.filtroLaboratorio.fecha = undefined;
		this.getFilter();
		this.getResultadosLaboratorio(1);
	}


}
