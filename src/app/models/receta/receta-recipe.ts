export class RecetaRecipe {

    public constructor(init?: Partial<RecetaRecipe>) {
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