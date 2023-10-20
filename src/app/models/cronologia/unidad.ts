export class Unidad {

    idUnidad?: number;
    idTipoUnidad?: number;
    idDelegacion?: number;
    nomCorto?: string;
    unidad?: string;
    localidad?: string;
    direccion?: string;
    idNivelAtencion?: number;

    public constructor(init?: Partial<Unidad>) {
        Object.assign(this, init);
    }
}


