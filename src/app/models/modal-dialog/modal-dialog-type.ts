export interface ModalDialogType {
    type : string;
    title? : string;
    text? : string;
    acceptMessage? : string;
    imgSrc? : string;
    confirm? : Function;
    reject? : Function;
    dismiss? : Function;
    alerta? : boolean;
 }