import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAdministradorComponent } from './pedidos-administrador.component';

describe('PedidosAdministradorComponent', () => {
  let component: PedidosAdministradorComponent;
  let fixture: ComponentFixture<PedidosAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosAdministradorComponent]
    });
    fixture = TestBed.createComponent(PedidosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
