import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCronologiaComponent } from './header-cronologia.component';

describe('HeaderCronologiaComponent', () => {
  let component: HeaderCronologiaComponent;
  let fixture: ComponentFixture<HeaderCronologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCronologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCronologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
