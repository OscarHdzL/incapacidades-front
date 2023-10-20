export class DetalleNotaMedicaRequest {

  public constructor(init?: Partial<DetalleNotaMedicaRequest>) {
    Object.assign(this, init);
  }

  ooad: string;
  unidad: string;
  fecha: string;
  idee: string;

}