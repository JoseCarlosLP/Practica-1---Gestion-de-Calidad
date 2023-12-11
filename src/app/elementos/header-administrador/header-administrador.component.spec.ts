import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdministradorComponent } from './header-administrador.component';

describe('HeaderAdministradorComponent', () => {
  let component: HeaderAdministradorComponent;
  let fixture: ComponentFixture<HeaderAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAdministradorComponent]
    });
    fixture = TestBed.createComponent(HeaderAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
