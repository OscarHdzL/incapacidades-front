import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarnetApoInterno } from 'src/app/models/cronologia/carnet-apo-interno';
import { AutenticacionService } from 'src/app/services/authentication/authentication.service';
import { CronologiaService } from 'src/app/services/cronologia/cronologia.service';
import { ParentComponent } from '../../shared/parent/parent.component';

@Component({
  selector: 'app-carnet-apo',
  templateUrl: './carnet-apo.component.html',
  styleUrls: ['./carnet-apo.component.css']
})
export class CarnetApoComponent extends ParentComponent implements OnInit {

  @Input() idee: string;
  @Input() ideeFecha: string;

  constructor(protected formBuilder: FormBuilder, protected spinner: NgxSpinnerService,
    protected autenticacionService: AutenticacionService, protected router: Router,
    private cronologiaService: CronologiaService) {
    super(formBuilder, spinner, autenticacionService, router);
  }

  public arrayTable = [
		{ field: 'numCiclo', header: 'Ciclo ' },
		{ field: 'dropdown', header: 'dropdown' }
	];

  public carnet: CarnetApoInterno;

  ngOnInit(): void {
    this.getCarnet();
  }

  private getCarnet(){
    this.spinner.show();
    this.cronologiaService.getCarnetApo(this.idee).subscribe(response => {
      this.spinner.hide();
      this.carnet = response.body;
    });
  }

}
