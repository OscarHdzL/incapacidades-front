export class IndicadoresAuxiliares {

    public constructor(init?: Partial<IndicadoresAuxiliares>) {
        Object.assign(this, init);
    }

    existsRecipes?: boolean;
    existsReferences?: boolean;
    existsContraReferences?: boolean;
    existsInability?: boolean;
    
}