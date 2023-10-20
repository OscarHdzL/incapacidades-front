import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaMedicaComponent } from './nota-medica.component';

describe('NotaMedicaComponent', () => {
  let component: NotaMedicaComponent;
  let fixture: ComponentFixture<NotaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
