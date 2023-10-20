export const ENDPOINTS = {
    autenticacion: {
       login: '/mshc-autenticacion/v1/login',
       /* Estos dos endpoint es sobreescrito en el interceptor al final resuelve por hc-consultas-medicas */
       nidpToken: '/nidp/oauth/nam/token',
       nidpUserInfo: '/nidp/oauth/nam/userinfo'
    },
    cronologia: {
        paciente: '/mshc-notas/v1/pacientes/idee',
        bitacora: '/mshc-notas/v1/bitacoras',
        ooads: '/mshc-notas/v1/ooads',
        unidades: '/mshc-notas/v1/unidades',
        especialidades: '/mshc-notas/v1/especialidades',
        notasMedicas: '/mshc-notas/v1/notasMedicas',
        detalleNotaMedica: '/mshc-notas/v1/notasMedicas/pk',
        recetaDetalle: '/mshc-auxiliares/v1/recetas',
        carnet: '/mshc-notas/v1/carnets'
    },
    busqueda: {
        pacientes: '/mshc-notas/v1/pacientes',
    },
    recetas: {
        ooads: '/mshc-auxiliares/v1/recetasHistorico/ooads',
        unidades: '/mshc-auxiliares/v1/recetasHistorico/unidades',
        medicamentos: '/mshc-auxiliares/v1/recetasHistorico/medicamentos',
        recetas: '/mshc-auxiliares/v1/recetasHistorico'
    },
    laboratorio: {
        resultadosLaboratorio: '/mshc-auxiliares/v1/laboratorioHistorico',
        estudios: '/mshc-auxiliares/v1/laboratorioHistorico/estudios',
        pruebas: '/mshc-auxiliares/v1/laboratorioHistorico/pruebas',
        ooads : '/mshc-auxiliares/v1/laboratorioHistorico/ooads',
        unidades: '/mshc-auxiliares/v1/laboratorioHistorico/unidades'
    },
    referencia: {
        referencias: '/mshc-auxiliares/v1/referencias'
    },
    contrareferencia: {
        contrareferencias: '/mshc-auxiliares/v1/contrareferencias'
    },
    indicadores: {
        indicadores: "/mshc-notas/v1/indicadores"
    },
    incapacidades: {
        incapacidades: "/mshc-auxiliares/v1/incapacidadHistorico",
        diagnosticos: "/mshc-auxiliares/v1/incapacidadHistorico/diagnosticos",
        ooads: '/mshc-auxiliares/v1/incapacidadHistorico/ooads',
        unidades: '/mshc-auxiliares/v1/incapacidadHistorico/unidades',
        detalle: '/mshc-auxiliares/v1/incapacidades'
    },
    busquedaAvanzada: {
        ooads: '/mshc-notas/v1/busqueda/ooads',
        unidades: '/mshc-notas/v1/busqueda/unidades',
        diagnosticos: '/mshc-notas/v1/busqueda/diagnosticos',
        pacientes: '/mshc-notas/v1/busqueda/pacientes'
    },
    externo: {
        apop: {
            carnet: 'https://msapop-autenticacion-qa.cloudapps.imss.gob.mx/msapop-autenticacion/v2/oauth/token'
        },
        fuji: {
            imagenologia: '/mshc-imagenologia/v1/imagenes'
        }
    },
    incapacidad: {
        detalle: '/mshc-incapacidades/v1/incapacidades',
        historico: '/mshc-incapacidades/v1/incapacidades',
        delegaciones: '/mshc-incapacidades/v1/incapacidades/delegaciones',
        unidades: '/mshc-incapacidades/v1/incapacidades/unidades',
        diagnosticos: '/mshc-incapacidades/v1/incapacidades/diagnosticos'
    },
    hospitalizacion: {
        inicial: '/mshc-incapacidades/v1/notas'
    }
}
