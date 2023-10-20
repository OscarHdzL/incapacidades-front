export class Medicamento {

    public constructor(init?: Partial<Medicamento>) {
        Object.assign(this, init);
    }

    medicamento?: string;

}