import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrareferenciaComponent } from './contrareferencia.component';

describe('ContrareferenciaComponent', () => {
  let component: ContrareferenciaComponent;
  let fixture: ComponentFixture<ContrareferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrareferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrareferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
