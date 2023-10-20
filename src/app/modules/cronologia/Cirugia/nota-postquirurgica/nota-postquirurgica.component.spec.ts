import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaPostquirurgicaComponent } from './nota-postquirurgica.component';

describe('NotaPostquirurgicaComponent', () => {
  let component: NotaPostquirurgicaComponent;
  let fixture: ComponentFixture<NotaPostquirurgicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaPostquirurgicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaPostquirurgicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
