import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacidadDetailComponent } from './incapacidad-detail.component';

describe('IncapacidadDetailComponent', () => {
  let component: IncapacidadDetailComponent;
  let fixture: ComponentFixture<IncapacidadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncapacidadDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacidadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
