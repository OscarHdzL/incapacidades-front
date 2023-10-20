export class Estudio {

    public constructor(init?: Partial<Estudio>) {
        Object.assign(this, init);
    }

    estudios?: string;

}