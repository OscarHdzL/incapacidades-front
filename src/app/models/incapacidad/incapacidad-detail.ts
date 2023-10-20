export class IncapacidadDetail {

    public constructor(init?: Partial<IncapacidadDetail>) {
        Object.assign(this, init);
    }

    id: string
    cve_idee_fecha_atencion: string
    delegacion_expedidora: string
    clave_unidad_expedidora: string
    unidad_expedidora: string
    cve_idee: string
    num_nss: string
    agregado_medico: string
    fecha_expedicion: string
    folio: string
    fecha_inicio: string
    fecha_termino: string
    dias_acumulados: string
    dias_autorizados: string
    dias_probables_recuperacion: string
    ramo_seguro: string
    tipo_incapacidad: string
    ocupacion: string
    nombre_patron: string
    diagnostico: string
    clave_presupuestal_origen: string
    origen_dato: string
    fecha_proceso: string
    yearmonth: string

    //
    consultorio_atencion: string
    des_turno: string
}