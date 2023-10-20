export class EstudioTable {

    public constructor(init?: Partial<EstudioTable>) {
        Object.assign(this, init);
    }

    fecha?: string;
    estudio?: string;
    valorResultado?: string;
    unidadMedida?: string;
    valorReferenciaMinimo?: string;
    valorReferenciaMaximo?: string;
    referencia?: string;
    interpretacion?: string;
    
}