import { FiltroReferencia } from "./filtro-referencia";

export class ModelReferencia {

    public constructor(init?: Partial<ModelReferencia>) {
        Object.assign(this, init);
    }

    model: FiltroReferencia;
    
}