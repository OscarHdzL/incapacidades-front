export class Ciclo {

    public constructor(init?: Partial<Ciclo>) {
        Object.assign(this, init);
    }

    numCiclo?: string;
    medicamentos?: [];
}