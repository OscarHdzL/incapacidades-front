import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacidadDetalleComponent } from './incapacidad-detalle.component';

describe('IncapacidadDetalleComponent', () => {
  let component: IncapacidadDetalleComponent;
  let fixture: ComponentFixture<IncapacidadDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncapacidadDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacidadDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
