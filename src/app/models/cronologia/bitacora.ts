export class Bitacora {

    public constructor(init?: Partial<Bitacora>) {
        Object.assign(this, init);
    }

    id?: string;
    sistema?: string;
    sub?: string;
    matricula?: string;
    idee?: string;
    cveDelegacion?: string;
    cvePresupuestal?: string;
    especialidad?: string;
    turno?: string;
    consultorio?: string;
    cvePresupuestalAdscripcion?: string;
    evento?: string;
    nss?: string;
    agregadoMedico?: string;

    segundoApellido?: string;
    primerApellido?: string;
    nombre?: string;
}