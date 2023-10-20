import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaMedicaInicialComponent } from './nota-medica-inicial.component';

describe('NotaMedicaInicialComponent', () => {
  let component: NotaMedicaInicialComponent;
  let fixture: ComponentFixture<NotaMedicaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaMedicaInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaMedicaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
