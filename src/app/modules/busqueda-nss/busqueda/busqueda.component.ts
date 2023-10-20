import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Nss } from 'src/app/models/busqueda/nss';
import { DatosPaciente } from 'src/app/models/cronologia/datos-paciente';
import { Page } from 'src/app/models/pager/page';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { BusquedaService } from 'src/app/services/busqueda/busqueda.service';
import { DataService } from 'src/app/services/common/data/data.service';
import { PATHS } from '../../shared/constants/router/paths';
import { ParentComponent } from '../../shared/parent/parent.component';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent extends ParentComponent implements OnInit {

	public tableCols: any[];
	public pageRequest: PageRequest<Nss> = new PageRequest<Nss>();
	public pagePaciente: Page<DatosPaciente> = new Page<DatosPaciente>();
	public resultado: number = 0;

	constructor(protected formBuilder: FormBuilder,
		protected spinner: NgxSpinnerService,
		protected autenticacionService: AutenticacionService,
		protected router: Router,
		private data: DataService,
		private busquedaService: BusquedaService,
		private modalDialogService: ModalDialogService,) {
		super(formBuilder, spinner, autenticacionService, router);
	}

	ngOnInit(): void {
		this.createFormGroup();
		this.init();
	}

	public createFormGroup() {
		this.form = this.formBuilder.group({
			nss: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
		});
	}

	public init() {
		this.tableCols = [
			{ field: 'nombre', header: 'Nombre', subHeader: '', enabled: true },
			{ field: 'nss', header: 'NSS', subHeader: '', enabled: true },
			{ field: 'agregadoMedico', header: 'A. médico', subHeader: '', enabled: true },
			{ field: 'parentesco', header: 'Parentesco', subHeader: '', enabled: true },
			{ field: 'edadActual', header: 'Edad', subHeader: '', enabled: true },
			{ field: 'sexo', header: 'Sexo', subHeader: '', enabled: true },
			{ field: 'curp', header: 'CURP', subHeader: '', enabled: true }
		];
	}

	public buscar(page: number = 1) {
		this.pagePaciente = new Page<DatosPaciente>();
		this.resultado = 0;
		let nss: Nss = new Nss();
		nss.nss = this.form.value.nss;
		const pageRequest: PageRequest<Nss> = new PageRequest({ model: nss,
																order: this.pageRequest.order,
																desc: this.pageRequest.desc,
																pageSize: 100,
																page: page });
		this.spinner.show();
		this.busquedaService.getNucleoFamiliar(pageRequest).subscribe({
			next: (page) => {
				if(!page.body && this.resultado===0){
					this.spinner.hide()
					const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>El NSS no se encuentra en el Historial clínico</h4>';
					this.modalDialogService.showDialog('info', 'Su solicitud no pudo realizarse',
					  message, response => {
						this.resultado = 0;
						this.reset();
						if (!response) {
						  return;
						}
						
					});
					return;
				  }
				this.spinner.hide();
				this.pageRequest = pageRequest;
				this.resultado = page.body.totalElements;
				this.pagePaciente.number = page.body.number - 1;
				this.pagePaciente.init(page.body);

			},
			error: (e) => this.spinner.hide(),
			
		})
		
	}

	goCronologia(datosPaciente: DatosPaciente) {
		this.data.store();
		this.router.navigate([PATHS.cronologia]);
	}

	public reset(){
		this.pagePaciente = new Page<DatosPaciente>();
		this.form.reset();
	}

	public sortTable(header: any) {
		this.pageRequest.order = header.field;
		this.pageRequest.desc = !this.pageRequest.desc;
		this.buscar(1);
	}

	public navigateDetail(row: any) {
		
		this.router.navigate([PATHS.cronologia], { state: { paciente: row }});
	}
}
