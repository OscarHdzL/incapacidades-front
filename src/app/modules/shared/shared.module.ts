import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { HeaderComponent } from './header/header.component';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { RouteInterceptorComponent } from './route-interceptor/route-interceptor.component';
import { FechaCortaPipe } from './pipes/fecha-corta.pipe';
import { OnlyNumberDirective } from './directives/only-number.directive';



@NgModule({
  declarations: [
    ModalDialogComponent,
    ParentComponent,
    AlertComponent,
    HeaderComponent,
    RouteInterceptorComponent,
    FechaCortaPipe,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CalendarModule,
    PaginatorModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    PaginatorModule,
    ModalDialogComponent,
    AlertComponent,
    HeaderComponent,
    FechaCortaPipe,
    OnlyNumberDirective
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-MX' },
   // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
 ]  
})
export class SharedModule { }
