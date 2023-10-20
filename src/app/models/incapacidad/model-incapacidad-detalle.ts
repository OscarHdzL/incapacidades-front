import { FiltroIncapacidadDetalle } from "./filtro-incapacidad-detalle";

export class ModelIncapacidadDetalle {

    public constructor(init?: Partial<ModelIncapacidadDetalle>) {
        Object.assign(this, init);
    }

    model: FiltroIncapacidadDetalle;
    
}