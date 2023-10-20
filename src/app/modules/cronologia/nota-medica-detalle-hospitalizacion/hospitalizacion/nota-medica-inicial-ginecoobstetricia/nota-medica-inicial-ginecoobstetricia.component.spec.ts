import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaMedicaInicialGinecoobstetriciaComponent } from './nota-medica-inicial-ginecoobstetricia.component';

describe('NotaMedicaInicialGinecoobstetriciaComponent', () => {
  let component: NotaMedicaInicialGinecoobstetriciaComponent;
  let fixture: ComponentFixture<NotaMedicaInicialGinecoobstetriciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaMedicaInicialGinecoobstetriciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaMedicaInicialGinecoobstetriciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
