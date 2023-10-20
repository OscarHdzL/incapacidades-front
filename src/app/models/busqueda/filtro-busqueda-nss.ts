export class FiltroBusquedaNss {

    public constructor(init?: Partial<FiltroBusquedaNss>) {
        Object.assign(this, init);
    }

    nss? : string;
    nombre?: string;
    apellidos?: string;
    diagnostico?: string;
    ooad?: string;
    unidad?: string;
    incapacidad?: boolean;
    labs?: boolean;
    search?: any;

}