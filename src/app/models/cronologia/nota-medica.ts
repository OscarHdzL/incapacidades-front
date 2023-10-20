
import { IncapacidadDetail } from "../incapacidad/incapacidad-detail";
import { SubNotaMedica } from "./hospitalizacion/sub-nota-medica";

export interface NotaMedica {

    fecha?: string;
    ooad?: string;
    unidad?: string;
    diagnosticoPrincipal?: string;
    especialidad?: string;
    subNotasMedicas?: any[];
}