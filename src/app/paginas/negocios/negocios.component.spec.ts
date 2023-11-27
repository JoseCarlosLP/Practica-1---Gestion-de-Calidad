import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosComponent } from './negocios.component';

describe('NegociosComponent', () => {
  let component: NegociosComponent;
  let fixture: ComponentFixture<NegociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NegociosComponent]
    });
    fixture = TestBed.createComponent(NegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
