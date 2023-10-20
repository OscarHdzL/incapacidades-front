import { FiltroReceta } from "./filtro-receta";

export class ModelReceta {

    public constructor(init?: Partial<ModelReceta>) {
        Object.assign(this, init);
    }

    model: FiltroReceta;
    
}