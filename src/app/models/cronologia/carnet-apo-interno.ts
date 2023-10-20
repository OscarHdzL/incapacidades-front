import { Ciclo } from "./ciclo";

export class CarnetApoInterno {

    public constructor(init?: Partial<CarnetApoInterno>) {
        Object.assign(this, init);
    }

    idee?: string;
    nss?: string;
    agregadoMedico?: string;
    paciente?: string;
    nombre?: string;
    apellidos?: string;
    curp?: string;
    sexo?: string;
    edad?: string;
    talla?: string;
    peso?: string;
    sc?: string;
    fechaNacimiento?: string;
    numPiso?: string;
    numCama?: string;
    diagnostico?: string;
    procedimiento?: string;
    unidad?: string;
    medico?: string;
    ciclos?: Ciclo[];
}