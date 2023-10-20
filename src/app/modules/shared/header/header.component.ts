import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/common/data/data.service';
import { ModalDialogService } from 'src/app/services/common/modal-dialog/modal-dialog.service';
import { PATHS } from '../constants/router/paths';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {
    
  }

  public logout() {
    const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><label>La pantalla volverá al inicio</label><h4>¿Está seguro de cerrar su sesión?</h4>';
    this.modalDialogService.showDialog("confirm", "Su sesión va a terminar", message, (is) => {
      if (is) {
        sessionStorage.clear();
        this.router.navigate([PATHS.login]);
      }
    }, '', false, "Aceptar");
  }

  get usuario(): string {
    //DESCOMENTAR lIMON
    //return this.dataService.getModel().interno.nombre;
    return "limon";
  }

  get rol(): string {
    //DESCOMENTAR lIMON
    //return this.dataService.getModel().interno.rol;
    return "limon";
  }

}
