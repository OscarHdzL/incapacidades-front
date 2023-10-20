import { FiltroLaboratorio } from "./filtro-laboratorio";

export class ModelLaboratorio {

    public constructor(init?: Partial<ModelLaboratorio>) {
        Object.assign(this, init);
    }

    model: FiltroLaboratorio;
    
}