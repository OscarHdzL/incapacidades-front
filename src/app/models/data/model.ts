import { Bitacora } from "../cronologia/bitacora";
import { Interno } from "./interno";
import { Paciente } from "./paciente";

export class Model {
    tokenSession: string;
    interno: Interno = new Interno();
    paciente: Paciente;
    bitacora: Bitacora;
  }