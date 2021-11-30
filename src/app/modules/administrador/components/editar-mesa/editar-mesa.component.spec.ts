import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMesaComponent } from './editar-mesa.component';

describe('EditarMesaComponent', () => {
  let component: EditarMesaComponent;
  let fixture: ComponentFixture<EditarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
