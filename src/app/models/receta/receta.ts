import { MedicamentoTable } from "./medicamento-table";
import { RecetaHeader } from "./receta-header";
import { RecetaRecipe } from "./receta-recipe";

export class Receta {

    public constructor(init?: Partial<Receta>) {
        Object.assign(this, init);
    }

    header?: RecetaHeader;
    recipe?: RecetaRecipe[];
    medicamento?: MedicamentoTable[];

}