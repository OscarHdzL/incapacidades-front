import { Fecha } from "./nota-medica-detalle/fecha";

export class FiltroSelect {

    public constructor(init?: Partial<FiltroSelect>) {
        Object.assign(this, init);
    }

    idee?: string;
    ooad?: string;
    unidad?: string;
    especialidad?: string;
    fecha?: Fecha;
    
}