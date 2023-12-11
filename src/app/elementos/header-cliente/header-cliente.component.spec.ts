import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderClienteComponent } from './header-cliente.component';

describe('HeaderClienteComponent', () => {
  let component: HeaderClienteComponent;
  let fixture: ComponentFixture<HeaderClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderClienteComponent]
    });
    fixture = TestBed.createComponent(HeaderClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
