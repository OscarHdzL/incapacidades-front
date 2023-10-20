import { FiltroContrareferencia } from "./filtro-contrareferencia";

export class ModelContrareferencia {

    public constructor(init?: Partial<ModelContrareferencia>) {
        Object.assign(this, init);
    }

    model: FiltroContrareferencia
    
}