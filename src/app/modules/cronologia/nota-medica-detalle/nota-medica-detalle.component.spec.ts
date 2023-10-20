import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaMedicaDetalleComponent } from './nota-medica-detalle.component';

describe('NotaMedicaDetalleComponent', () => {
  let component: NotaMedicaDetalleComponent;
  let fixture: ComponentFixture<NotaMedicaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaMedicaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaMedicaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
