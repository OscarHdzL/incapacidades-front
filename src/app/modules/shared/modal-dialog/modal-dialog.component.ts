import { Component, OnInit } from '@angular/core';
import { ModalDialogType } from 'src/app/models/modal-dialog/modal-dialog-type';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';

@Component({
   selector: 'app-modal-dialog',
   templateUrl: './modal-dialog.component.html',
   styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

   modalDlg : ModalDialogType;

   constructor(private dlgSvc : ModalDialogService) { }

   ngOnInit(): void {
      this.dlgSvc._listener.subscribe(modal => this.modalDlg = modal);
   }

}