export class Contrareferencia {

    public constructor(init?: Partial<Contrareferencia>) {
        Object.assign(this, init);
    }

    fechaAltaServicio?: string;
    delegacionDestino?: string;
    unidadDestino?: string;
    consultasOtorgadas?: string;
    diagnosticoInicial?: string;
    diagnosticoFinal?: string;
    fechaPrimeraConsulta?: string;
    pronostico?: string;
    medicamento?: string;
    delegacionExpedidora?: string;
    unidadExpedidora?: string;
    consultorioAtencion?: string;
    desTurno?: string;
    especialidad?: string;
}

