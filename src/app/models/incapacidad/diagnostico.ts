export class Diagnostico {

    public constructor(init?: Partial<Diagnostico>) {
        Object.assign(this, init);
    }

    diagnostico?: string;

}