import { FiltroIncapacidad } from "./filtro-incapacidad";

export class ModelIncapacidad {

    public constructor(init?: Partial<ModelIncapacidad>) {
        Object.assign(this, init);
    }

    model: FiltroIncapacidad;
    
}