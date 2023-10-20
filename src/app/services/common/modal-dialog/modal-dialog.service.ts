import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { ModalDialogType } from 'src/app/models/modal-dialog/modal-dialog-type';

@Injectable({
   providedIn: 'root'
})
export class ModalDialogService {

   private listener$ : Subject<ModalDialogType>;

   constructor(private sanitizer: DomSanitizer) { 
      this.listener$ = new Subject<ModalDialogType>();
   }

   get _listener() : Observable<ModalDialogType> {
      return this.listener$.asObservable();
   }

   showDialog(type : string = "info", title : string = "", message : string = "", callback : (boolean) => any = null, img : string = "", alerta : boolean = false,
      acceptMessage?:string) {
      acceptMessage = acceptMessage ? acceptMessage : 'Aceptar';
      let sanitizedMessage : any = this.sanitizer.bypassSecurityTrustHtml(message);
      let self = this;
      this.listener$.next({
         type: type, //info, confirm, tooltip
         title: title,
         text: sanitizedMessage,
         acceptMessage: acceptMessage,
         imgSrc: img,
         confirm: function () { self.listener$.next(); if ( callback!=null && callback!=undefined) callback(true); },
         reject: function () { self.listener$.next();  if ( callback!=null && callback!=undefined) callback(false); },
         dismiss: function () { self.listener$.next(); },
         alerta,
      });
   }

}
