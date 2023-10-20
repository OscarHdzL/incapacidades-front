export class Info {

    public constructor(init?: Partial<Info>) {
        Object.assign(this, init);
    }

    folio: string;
    diasAutorizados: string;
    diasProbables: string;
    diasAcumulados: string;
    ramoSeguro: string;
    tipoIncapacidad: string;

    //CAMPOS NUEVOS SOLICITADOS
    ocupacion: string;
    nombre_patron: string;

}