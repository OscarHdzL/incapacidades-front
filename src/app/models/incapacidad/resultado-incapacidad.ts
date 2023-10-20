import { Info } from "./info";

export class ResultadoIncapacidad {

    public constructor(init?: Partial<ResultadoIncapacidad>) {
        Object.assign(this, init);
    }

    fecha: string;
    ooad: string;
    unidad: string;
    diagnostico: string;
    fechaInicio: string;
    fechaTermino: string;
    ideeFecha: string;
    info: Info;
    
}