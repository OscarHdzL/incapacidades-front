
export class Interno {

    public constructor(init?: Partial<Interno>) {
        Object.assign(this, init);
    }

    curp?: string;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    matricula?: string;
    rol?: string;
    delegacion?: string;
    subdelegacion?: string;
    correo?: string;
    
}