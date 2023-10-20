export class Paciente {

    public constructor(init?: Partial<Paciente>) {
        Object.assign(this, init);
    }

    nss?: string;
    agregadoMedico?: string;
    idee?: string;
    cvePresupuestalAdscripcion?: string;
}