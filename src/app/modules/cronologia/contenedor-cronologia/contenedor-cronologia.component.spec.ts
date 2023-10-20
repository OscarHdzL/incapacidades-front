import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorCronologiaComponent } from './contenedor-cronologia.component';

describe('ContenedorCronologiaComponent', () => {
  let component: ContenedorCronologiaComponent;
  let fixture: ComponentFixture<ContenedorCronologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorCronologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorCronologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
