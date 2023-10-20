import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DetalleNotaMedica } from 'src/app/models/cronologia/nota-medica-detalle/detalle-nota-medica';
import { RecetaDetalle } from 'src/app/models/cronologia/recetaDetalle';
import { PageRequest } from 'src/app/models/pager/page.request';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { CronologiaService } from 'src/app/services/cronologia/cronologia.service';
import { ParentComponent } from '../../shared/parent/parent.component';
import * as moment from 'moment';
import { TIPO_RECETA } from '../../shared/constants/cronologia/tipo-receta.enum';

@Component({
	selector: 'app-receta-detalle',
	templateUrl: './receta-detalle.component.html',
	styleUrls: ['./receta-detalle.component.css']
})
export class RecetaDetalleComponent extends ParentComponent implements OnInit {

	@Input() idee: string;

	@Input() recetaDetalleIndex: number;

	@Input() detalleNotaMedica: DetalleNotaMedica = new DetalleNotaMedica();

	public recetaDetalle: RecetaDetalle[] = [];

	public dateHeaderParsed: string;
	public list?: any[] = [];

	constructor(
		protected formBuilder: FormBuilder,
		protected spinner: NgxSpinnerService,
		protected autenticacionService: AutenticacionService,
		protected router: Router,
		private cronologiaService: CronologiaService) {
		super(formBuilder, spinner, autenticacionService, router);
	}

	ngOnInit(): void {
		this.getRecetaDetalle();
        const dateHeader = moment(this.detalleNotaMedica.notaMedicaParent.fecha, 'DD/MM/YYYY h:mm a');
        this.dateHeaderParsed = dateHeader.format('dddd DD [de]') + ' ' +
                                dateHeader.format('MMMM')[0].toUpperCase() + dateHeader.format('MMMM').slice(1).toLowerCase() + ' ' +
                                dateHeader.format('[del] YYYY h:mm:ss');
	}

	private async getRecetaDetalle(): Promise<any> {

		const pageRequest: PageRequest<any> = new PageRequest({
			model: { ideeFecha: this.detalleNotaMedica.ideeFecha,
				idee: this.detalleNotaMedica.idee
			},
			"page": 1
		});

		return new Promise((resolve) => {
			this.cronologiaService.getRecetaDetalle(pageRequest).subscribe({
				next: (response) => {
					if (response.body?.recipe) {
						this.recetaDetalle = response.body?.recipe;
						this.generateList(response.body?.recipe).then(()=>{
							resolve(this.list);	
						})
					}
				},
				error: (e) => console.error(e)
			});
		});

	}

	private async generateList(rds: RecetaDetalle[]): Promise<any> {
		return new Promise((resolve) => {
			this.list.length = 0;
			let m = -3;
			for (var _i = 0; _i < rds.length; _i++) {
				if (_i % 3 == 0) { m = m + 3; }
				this.list[(_i + m)] = { 
					medicamento: rds[_i]?.medicamento, 
					cada: rds[_i]?.cada, 
					durante: rds[_i]?.durante, 
					tipoReceta: rds[_i]?.tipoReceta };
				this.list[(_i + m) + 3] = {
					medicamento: undefined,
					viaAdministracion: rds[_i]?.viaAdministracion, 
					indicaciones: rds[_i]?.indicaciones, 
					cada: rds[_i]?.cada, durante: rds[_i]?.durante, 
					indicacionesAdicionales: rds[_i]?.indicacionesAdicionales, 
					tipoReceta: rds[_i]?.tipoReceta };
			}
			resolve(this.list);
		});
	}

	public get tipoReceta() {
		return TIPO_RECETA;
	  }
}
