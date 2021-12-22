import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMesaComponent } from './agregar-mesa.component';

describe('AgregarMesaComponent', () => {
  let component: AgregarMesaComponent;
  let fixture: ComponentFixture<AgregarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
