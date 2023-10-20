import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEgresoUrgenciasComponent } from './nota-egreso-urgencias.component';

describe('NotaEgresoUrgenciasComponent', () => {
  let component: NotaEgresoUrgenciasComponent;
  let fixture: ComponentFixture<NotaEgresoUrgenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaEgresoUrgenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaEgresoUrgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
