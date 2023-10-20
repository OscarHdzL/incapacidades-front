export class EntidadFederativa {

    idDelegacion?: number;
    idEntidadFederativa?: number;
    cveDelegacion?: number;
    delegacion?: string;

    public constructor(init?: Partial<EntidadFederativa>) {
        Object.assign(this, init);
    }
}