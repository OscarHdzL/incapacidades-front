export class Referencia {

    public constructor(init?: Partial<Referencia>) {
        Object.assign(this, init);
    }

    fecha?: string;
    ooad?: string;
    unidad?: string;
    tipoConsulta?: string;
    ocasion?: string;
    motivoEnvio?: string;
    delegacionEnvia?: string;
    unidadEnvia?: string;
    especialidadEnvia?: string;
    diagnostico?: string;
    informacionAdicional?: string;

    consultorioAtencion?: string;
    desTurno?: string;

}

