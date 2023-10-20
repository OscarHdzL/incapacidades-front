export class DatosPaciente {

    public constructor(init?: Partial<DatosPaciente>) {
        Object.assign(this, init);
    }

    nss?: string;
    nombre?: string;
    agregadoMedico?: string;
    parentesco?: string;
    idee?: string;
    edadActual?: string;
    edadNota?: string
    sexo?: string;
    curp?: string;
    carnet?: boolean = false;
}