/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotaMedicaDetalleHospitalizacionComponent } from './nota-medica-detalle-hospitalizacion.component';

describe('NotaMedicaDetalleHospitalizacionComponent', () => {
  let component: NotaMedicaDetalleHospitalizacionComponent;
  let fixture: ComponentFixture<NotaMedicaDetalleHospitalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaMedicaDetalleHospitalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaMedicaDetalleHospitalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
