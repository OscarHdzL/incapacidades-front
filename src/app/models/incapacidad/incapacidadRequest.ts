export class IncapacidadRequest {
  public constructor(init?: Partial<IncapacidadRequest>) {
    Object.assign(this, init);
  }
  model: FiltrosIncapacidad;
  page: number;
  pageSize: number;
  order: string;
  desc: boolean;
}

export class FiltrosIncapacidad {
  public constructor(init?: Partial<FiltrosIncapacidad>) {
    Object.assign(this, init);
  }
  start: any;
  end: any;
  num_nss: string;
  agregado_medico: string;
  delegacion_expedidora: any;
  unidad_expedidora: any;
  diagnostico: any;
  idee: any;
}
