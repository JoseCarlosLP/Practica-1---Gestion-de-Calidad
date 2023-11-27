import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DNegocioComponent } from './dnegocio.component';

describe('DNegocioComponent', () => {
  let component: DNegocioComponent;
  let fixture: ComponentFixture<DNegocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DNegocioComponent]
    });
    fixture = TestBed.createComponent(DNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
