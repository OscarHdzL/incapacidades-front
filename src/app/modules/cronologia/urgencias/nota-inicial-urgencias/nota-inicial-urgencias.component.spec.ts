import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaInicialUrgenciasComponent } from './nota-inicial-urgencias.component';

describe('NotaInicialUrgenciasComponent', () => {
  let component: NotaInicialUrgenciasComponent;
  let fixture: ComponentFixture<NotaInicialUrgenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaInicialUrgenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaInicialUrgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
