import { Fecha } from "../cronologia/nota-medica-detalle/fecha";

export class FiltroReceta {

    public constructor(init?: Partial<FiltroReceta>) {
        Object.assign(this, init);
    }

    idee?: string;
    ooad?: string;
    unidad?: string;
    medicamento?: string;
    fecha?: Fecha;
    
}