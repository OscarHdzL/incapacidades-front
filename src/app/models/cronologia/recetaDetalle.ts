export class RecetaDetalle {

    public constructor(init?: Partial<RecetaDetalle>) {
        Object.assign(this, init);
    }

    tipoReceta?: string;
    medicamento?: string;
    cada?: string;
    durante?: string;
    indicaciones?: string;
    indicacionesAdicionales?: string;
    viaAdministracion?: string;

}