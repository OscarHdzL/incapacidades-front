import { NotaMedica } from "../nota-medica";
import { Diagnostico } from "./diagnostico";
import { Medico } from "./medico";
import { Procedimiento } from "./procedimiento";
import { Somatometria } from "./somatometria";

export class DetalleNotaMedica {

  public constructor(init?: Partial<DetalleNotaMedica>) {
    Object.assign(this, init);
  }

  somatometria?: Somatometria = new Somatometria();
  resumenClinico?: string;
  diagnosticos?: Diagnostico[];
  procedimiento?: Procedimiento[];
  exploracionFisica?: string;
  motivoParaNoRegistrarExploracionFisica?: string
  indicacionesAdicionales?: string;
  lugarAccidente?: string;
  medico?: Medico = new Medico();
  ideeFecha?: string;
  idee?: string;
  edadActual?: number;
  edadNota?: number;

  /* Atributos transient */
  notaMedicaParent?: NotaMedica;
  
}