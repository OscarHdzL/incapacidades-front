import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FiltroBusquedaNss } from 'src/app/models/busqueda/filtro-busqueda-nss';
import { Search } from 'src/app/models/busqueda/search';
import { DatosPaciente } from 'src/app/models/cronologia/datos-paciente';
import { FiltroSelect } from 'src/app/models/cronologia/filtro-select';
import { Diagnostico } from 'src/app/models/cronologia/nota-medica-detalle/diagnostico';
import { Ooad } from 'src/app/models/cronologia/ooad';
import { Unidad } from 'src/app/models/cronologia/unidad';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { BusquedaAvanzadaService } from 'src/app/services/busqueda-avananzada/busqueda-avanzada.service';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { PATHS } from '../../shared/constants/router/paths';
import { ParentComponent } from '../../shared/parent/parent.component';

@Component({
	selector: 'app-busqueda-avanzada',
	templateUrl: './busqueda-avanzada.component.html',
	styleUrls: ['./busqueda-avanzada.component.css']
})
export class BusquedaAvanzadaComponent extends ParentComponent implements OnInit {

	public tableCols: any[];
	public pageRequest: PageRequest<FiltroBusquedaNss> = new PageRequest<FiltroBusquedaNss>();
	public pacientes: Page<DatosPaciente> = new Page<DatosPaciente>();

	public ooads: Ooad[];
	public unidades: Unidad[];
	public cie10List: Diagnostico[];
	public model: FiltroSelect = new FiltroSelect();
	private cie10Selected: any;

	constructor(protected formBuilder: FormBuilder,
		protected spinner: NgxSpinnerService,
		protected autenticacionService: AutenticacionService,
		protected router: Router,
		private busquedaAvanzadaService: BusquedaAvanzadaService,
		private modalDialogService: ModalDialogService,
		private busquedaService: BusquedaAvanzadaService) {
		super(formBuilder, spinner, autenticacionService, router);
	}

	ngOnInit(): void {
		this.createFormGroup();
		this.init();
	}

	public init() {
		// this.getDiagnosticos();
		this.getOoads().then(() => {
			this.tableCols = [
				{ field: 'nombre', header: 'Nombre', subHeader: '', enabled: true },
				{ field: 'nss', header: 'NSS', subHeader: '', enabled: true },
				{ field: 'agregadoMedico', header: 'A. médico', subHeader: '', enabled: true },
				{ field: 'edadActual', header: 'Edad', subHeader: '', enabled: true },
				{ field: 'sexo', header: 'Sexo', subHeader: '', enabled: true },
			];
		})
	}

	private getOoads(): Promise<any> {
		return new Promise((resolve) => {
			this.busquedaAvanzadaService.getOoads().subscribe(response => {
				this.form.get('idOoad').setValue('');
				this.unidades = [];
				this.ooads = response.body;
				resolve(response);
			});
		});
	}

	public getUnidades(): Promise<any> {
		if (!this.form.get('idOoad').value) {
			this.form.get('idOoad').setValue('');
			this.unidades = [];
			return;
		}
		this.spinner.show();
		return new Promise((resolve) => {
			this.busquedaAvanzadaService.getUnidades(this.form.get('idOoad').value).subscribe(response => {
				this.unidades = response.body;
				this.spinner.hide();
				resolve(response);
			});
		});
	}

	public createFormGroup() {
		this.form = this.formBuilder.group({
			nss: [''],
			idOoad: [''],
			idUnidad: [''],
			nombre: [''],
			primerApellido: [''],
			cie10: [''],
			radioIncapacidad: ['false'],
			radioEstudio: ['false']
		});
	}

	public buscar(page: number) {
		
		if (!this.validForm()) {
			const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>Por favor ingrese al menos un criterio de búsqueda</h4>';
			this.modalDialogService.showDialog('info', 'Su solicitud no pudo realizarse',
				message, response => {
					if (!response) {
						return;
					}

				});
			return;
		}

		const search_: Search = {
			// nss: this.form.get('nss').value && this.form.get('nss').value != '' ? this.form.get('nss').value : null,
			nombre: this.form.get('nombre').value && this.form.get('nombre').value != '' ? this.form.get('nombre').value.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : null,
			apellidos: this.form.get('primerApellido').value && this.form.get('primerApellido').value != '' ? this.form.get('primerApellido').value.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : null,
			diagnostico: this.form.get('cie10').value && this.form.get('cie10').value != '' ? this.form.get('cie10').value.toLowerCase().charAt(0).toUpperCase() + this.form.get('cie10').value.slice(1) : null,
			ooad: this.form.get('idOoad').value && this.form.get('idOoad').value != '' ? this.form.get('idOoad').value : null,
			unidad: this.form.get('idUnidad').value && this.form.get('idUnidad').value != '' ? this.form.get('idUnidad').value : null,
			incapacidad: this.form.get('radioIncapacidad').value == 'true' ? true : false,
			labs: this.form.get('radioEstudio').value == 'true' ? true : false,
		}

		var pageRequest: PageRequest<FiltroBusquedaNss>;

		if(this.form.get('nss').value && this.form.get('nss').value != ''){
			pageRequest = new PageRequest({
				model: {
					nss: this.form.get('nss').value,
					search: search_
				},
				order: this.pageRequest.order,
				desc: this.pageRequest.desc,
				pageSize: 10,
				page: page
			});
		}else{
			pageRequest = new PageRequest({
				model: {
					search: search_
				},
				order: this.pageRequest.order,
				desc: this.pageRequest.desc,
				pageSize: 10,
				page: page
			});
		}


		this.spinner.show();
		this.busquedaService.getPacientesPorFiltro(pageRequest).subscribe({
			next: (page) => {
				if (!page.body) {
					this.spinner.hide()
					const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>No se encontraron coincidencias en el Historial clínico</h4>';
					this.modalDialogService.showDialog('info', 'Su solicitud no pudo realizarse',
						message, response => {
							if (!response) {
								return;
							}

						});
					return;
				}
				this.spinner.hide();
				this.pacientes.init(page.body);
			},
			error: (e) => this.spinner.hide(),

		})
	}

	private validForm(): boolean {
		if (this.form.get('nss').value && this.form.get('nss').value != '' ||
			this.form.get('nombre').value && this.form.get('nombre').value != '' ||
			this.form.get('primerApellido').value && this.form.get('primerApellido').value != '' ||
			this.form.get('cie10').value && this.form.get('cie10').value != '' ||
			this.form.get('idOoad').value && this.form.get('idOoad').value != '' ||
			this.form.get('idUnidad').value && this.form.get('idUnidad').value != '' ||
			this.form.get('radioIncapacidad').value && this.form.get('radioIncapacidad').value != '' ||
			this.form.get('radioEstudio').value && this.form.get('radioEstudio').value != '')
		{
			return true;
		} else {
			return false;
		}
	}

	public getPager(event) {
		this.buscar(event.page + 1);
	}

	public selectedElement() {
		this.cie10Selected = this.searchValueFromArray(this.cie10List, (<HTMLInputElement>document.getElementById('cie10')).value, 'diagnostico')[0];
		if (!this.cie10Selected) {
			this.form.get('cie10').setValue('');
		}
	}

	private searchValueFromArray(arr, regex, attr) {
		let matches = [], i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i][attr].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("  ", " ") == (regex.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
				matches.push(arr[i]);
			}
		}
		return matches;
	};

	private searchFromArray(arr, regex) {
		let matches = [], i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("  ", " ").match(regex.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("  ", " "))) {
				matches.push(arr[i]);
			}
		}
		return matches;
	};

	public omitSpecialChar(event) {
		let k;
		k = event.charCode;
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32);
	}

	public getInput() {
		let filtro = (<HTMLInputElement>document.getElementById('cie10')).value;
		try {
			this.cie10List = this.searchFromArray(this.cie10List, filtro);
		} catch (error) {

		}
	}

	public reset() {
		this.pacientes = new Page<DatosPaciente>();
		this.createFormGroup();
	}

	public sortTable(header: any) {
		this.pageRequest.order = header.field;
		this.pageRequest.desc = !this.pageRequest.desc;
		this.buscar(1);
	}

	public navigateDetail(row: any) {
		this.router.navigate([PATHS.cronologia], { state: { paciente: row } });
	}

}
