import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatosPaciente } from 'src/app/models/cronologia/datos-paciente';
import { Model } from 'src/app/models/data/model';
import { Paciente } from 'src/app/models/data/paciente';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  public model : Model = new Model();

  public store() {
    sessionStorage.setItem(btoa('model'), JSON.stringify(this.model));
  }

  public storePaciente(paciente: Paciente) {
    
    //let model: Model = JSON.parse(sessionStorage.getItem(btoa('model')));

    let model = new Model();
    
    model.paciente = paciente;
    sessionStorage.setItem(btoa('model'), JSON.stringify(model));
  }
  
  public getModel(): Model {
    
    return JSON.parse(sessionStorage.getItem(btoa('model')));
  }


  public storeDatosPaciente(paciente: DatosPaciente) {
    sessionStorage.setItem(btoa('modelPaciente'), JSON.stringify(paciente));
  }
  
  public getDatosPaciente(): DatosPaciente {
    return JSON.parse(sessionStorage.getItem(btoa('modelPaciente')));
  }

}
