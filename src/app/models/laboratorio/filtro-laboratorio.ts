import { Fecha } from "../cronologia/nota-medica-detalle/fecha";

export class FiltroLaboratorio {

  public constructor(init?: Partial<FiltroLaboratorio>) {
    Object.assign(this, init);
}

  fecha?: Fecha;
  idee: string = '';
  ooad: string = '';
  unidad: string = '';
  estudio: string = '';
  prueba: string = '';
}