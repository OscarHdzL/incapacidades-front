export class RecetaHeader {

    public constructor(init?: Partial<RecetaHeader>) {
        Object.assign(this, init);
    }

    fecha?: string;
    ooad?: string;
    unidad?: string;
    diagnosticoPrincipal?: string;
    tipoReceta?: string;

}