import { Fecha } from "../cronologia/nota-medica-detalle/fecha";

export class FiltroIncapacidad {

  public constructor(init?: Partial<FiltroIncapacidad>) {
    Object.assign(this, init);
}

  fecha?: Fecha;
  idee: string = '';
  ooad: string = '';
  unidad: string = '';
  diagnostico: string = '';
}