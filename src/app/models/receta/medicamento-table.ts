export class MedicamentoTable {

    public constructor(init?: Partial<MedicamentoTable>) {
        Object.assign(this, init);
    }

    diagnosticoPrincipal?: string;
    ooad?: string;
    unidad?: string;
    medicamento?: string;
    fecha?: string;
    
}