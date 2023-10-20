import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetApoComponent } from './carnet-apo.component';

describe('CarnetApoComponent', () => {
  let component: CarnetApoComponent;
  let fixture: ComponentFixture<CarnetApoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetApoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetApoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
