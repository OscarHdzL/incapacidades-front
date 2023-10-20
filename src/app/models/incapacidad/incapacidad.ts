export class Incapacidad {

    public constructor(init?: Partial<Incapacidad>) {
        Object.assign(this, init);
    }

    ooad: string;
    unidad: string;
    fecha: string;
    folio: string;
    fechaInicio: string;
    fechaTermino: string;
    diasAutorizados: number;
    diasProbables: number;
    diasAcumulados: number;
    ramoSeguro: string;
    tipoIncapacidad: string;
    ocupacion: string;
    patron: string;
    diagnostico: string;

}