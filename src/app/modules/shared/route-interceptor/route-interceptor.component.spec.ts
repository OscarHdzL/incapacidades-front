import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInterceptorComponent } from './route-interceptor.component';

describe('RouteInterceptorComponent', () => {
  let component: RouteInterceptorComponent;
  let fixture: ComponentFixture<RouteInterceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteInterceptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
