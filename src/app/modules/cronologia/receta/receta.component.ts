import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EntidadFederativa } from 'src/app/models/cronologia/entidadFederativa';
import { Medicamento } from 'src/app/models/receta/medicamento';
import { Fecha } from 'src/app/models/cronologia/nota-medica-detalle/fecha';
import { Unidad } from 'src/app/models/cronologia/unidad';
import { PageRequest } from 'src/app/models/pager/page.request';
import { FiltroReceta } from 'src/app/models/receta/filtro-receta';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { RecetaService } from 'src/app/services/receta/receta.service';
import { ID_TIPO_CATALOGO } from '../../shared/constants/cronologia/catalogo';
import { ParentComponent } from '../../shared/parent/parent.component';
import { ModelReceta } from 'src/app/models/receta/model-receta';
import { Receta } from 'src/app/models/receta/receta';
import { Page } from 'src/app/models/pager/page';
import { MedicamentoTable } from 'src/app/models/receta/medicamento-table';

@Component({
	selector: 'app-receta',
	templateUrl: './receta.component.html',
	styleUrls: ['./receta.component.css']
})
export class RecetaComponent extends ParentComponent implements OnInit {

	@Input() idee: string;
	@Output() edadDetalleEvent: EventEmitter<number> = new EventEmitter<number>();

	public ooads: EntidadFederativa[];
	public unidades: Unidad[];
	public medicamentos: Medicamento[];
	public filtroReceta: FiltroReceta = new FiltroReceta();
	public modelReceta: ModelReceta = new ModelReceta();
	public pageRequest: PageRequest<FiltroReceta> = new PageRequest<FiltroReceta>();
	public recetas: Page<Receta> = new Page<Receta>();
	public medicamentosTable: Page<MedicamentoTable> = new Page<MedicamentoTable>();
	public offset: number = 0;

	@ViewChild('dateFilter') datePicker;
	@ViewChild('paginator') paginator;

	public arrayTable = [
		{ field: 'fecha', header: 'Fecha' },
		{ field: 'ooad', header: 'OOAD' },
		{ field: 'unidad', header: 'Unidad Médica' },
		{ field: 'tipoReceta', header: 'Tipo de receta' },
		{ field: 'diagnosticoPrincipal', header: 'Diagnóstico principal' },
		{ field: 'dropdown', header: 'dropdown' }
	];

	public arraySubTable = [
		{ field: 'medicamento', header: 'Medicamento' },
		{ field: 'indicaciones', header: 'Dosis' },
		{ field: 'viaAdministracion', header: 'Vía de administración' },
		{ field: 'cada', header: 'Cada' },
		{ field: 'durante', header: 'Durante' }
	];

	public arrayMedicamentoTable = [
		{ field: 'fecha', header: 'Fecha' },
		{ field: 'medicamento', header: 'Medicamento' },
		{ field: 'ooad', header: 'OOAD' },
		{ field: 'unidad', header: 'Unidad Médica' },
		{ field: 'diagnosticoPrincipal', header: 'Diagnóstico principal' },
	];

	constructor(protected formBuilder: FormBuilder,
		protected spinner: NgxSpinnerService,
		protected autenticacionService: AutenticacionService,
		protected router: Router,
		private recetaService: RecetaService) {
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
			this.getRecetas(1);
		});
	}

	public clearIfNotEndDate(){
		if(this.filtroReceta?.fecha && (this.filtroReceta.fecha.end == '')){
			this.filtroReceta.fecha = undefined;
			this.form.get('date').setValue(undefined);
		}
	}

	public async getRecetas(page: number): Promise<any> {
		this.spinner.show();
		this.getFilter();
		return new Promise((resolve) => {
			this.pageRequest.page = page;
			this.pageRequest.model = this.filtroReceta;
			this.recetaService.getRecetas(this.pageRequest)
				.subscribe(response => {
					this.spinner.hide();
					if (this.form.get('idMedicamento').value && this.form.get('idMedicamento').value!='0') {
						this.medicamentosTable = response.body;
						this.medicamentosTable.currentPage = page;
					} else {
						this.recetas = response.body;
						this.recetas.currentPage = page;
						this.getMedicamentos();
					}
					if (!this.recetas) {
						resolve(undefined);
					}
					resolve(this.recetas);
				});
			this.offset = this.pageRequest.pageSize * (this.pageRequest.page - 1);
		});

	}

	public getPagerRecetas(event) {
		this.getRecetas(event.page + 1);
	}

	private async getOoads(): Promise<any> {
		this.getFilter();
		return new Promise((resolve) => {
			this.recetaService.getDatosPorFiltro(this.modelReceta, ID_TIPO_CATALOGO.ooads).subscribe(response => {
				this.ooads = response.body.content;
				resolve(response);
			});
		});
	}

	private async getMedicamentos(): Promise<any> {
		return new Promise((resolve) => {
			this.recetaService.getDatosPorFiltro(this.modelReceta, ID_TIPO_CATALOGO.medicamentos, this.idee).subscribe(response => {
				this.medicamentos = response.body.content;
				resolve(response);
			});
		});
	}

	public createFormGroup() {
		this.form = this.formBuilder.group({
			fecNota: [''],
			idOoad: [''],
			idUnidad: [''],
			idMedicamento: [''],
			date: ['']
		});
	}

	public ooadChange() {
		this.unidades = [];
		this.form.get('idUnidad')?.reset('');
		this.form.get('idEspecialidad')?.reset('');
		this.getFilter();
		this.spinner.show();
		this.paginator.changePage(0);
		return new Promise((resolve) => {
			this.recetaService.getDatosPorFiltro(this.modelReceta, ID_TIPO_CATALOGO.unidades).subscribe(response => {
				this.unidades = response.body.content;
				this.spinner.hide();
				this.getRecetas(1);
				resolve(this.unidades);
			});
		});
	}

	public medicamentoChange() {
		this.getRecetas(1);
		if(this.paginator!==undefined){
		this.paginator.changePage(0);
		}
	}

	public sortTable(header: any) {
		this.pageRequest.order = header.field;
		this.pageRequest.desc = !this.pageRequest.desc;
		this.getRecetas(1);
	}

	private getFilter() {
		this.filtroReceta.idee = this.idee;

		if (!this.form.get('idMedicamento').value || this.form.get('idMedicamento').value == '' || this.form.get('idMedicamento').value === '0') {
			this.filtroReceta.medicamento = undefined;
		} else {
			this.filtroReceta.medicamento = this.form.get('idMedicamento').value;
		}

		if (!this.form.get('idOoad').value || this.form.get('idOoad').value == '') {
			this.filtroReceta.ooad = undefined;
		} else {
			this.filtroReceta.ooad = this.form.get('idOoad').value;
		}

		if (!this.form.get('idUnidad').value || this.form.get('idUnidad').value == '') {
			this.filtroReceta.unidad = undefined;
		} else {
			this.filtroReceta.unidad = this.form.get('idUnidad').value;
		}

		if(this.filtroReceta?.fecha?.start && (this.filtroReceta?.fecha?.end == '' || this.filtroReceta?.fecha?.end == undefined)){
			this.filtroReceta.fecha.end = this.filtroReceta.fecha.start;
		}

		this.modelReceta.model = this.filtroReceta;
	}

	public selectedDates(event) {

		let day = event.getDate();
		let month = event.getMonth() + 1;
		let year = event.getFullYear();

		if (!this.filtroReceta.fecha) {
			this.filtroReceta.fecha = new Fecha();
		}

		if (this.filtroReceta.fecha.start && this.filtroReceta.fecha.end) {
			this.filtroReceta.fecha.start = '';
			this.filtroReceta.fecha.end = '';
		}

		if (!this.filtroReceta.fecha.start) {
			this.filtroReceta.fecha.start = (day + '/' + month + '/' + year);
			return;
		}

		if (!this.filtroReceta.fecha.end) {
			this.filtroReceta.fecha.end = (day + '/' + month + '/' + year);
			this.datePicker.overlayVisible = false;
			this.getFilter();
			this.getRecetas(1);
			this.paginator.changePage(0);
		}

	}

	public clearDate() {
		this.filtroReceta.fecha = undefined;
		this.getFilter();
		this.getRecetas(1);
	}

	public unidadChange(){
		this.paginator.changePage(0);
	}
}
