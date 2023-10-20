export class Fecha {

    public constructor(init?: Partial<Fecha>) {
        Object.assign(this, init);
    }

    start?: string = '';
    end?: string = '';
    
}