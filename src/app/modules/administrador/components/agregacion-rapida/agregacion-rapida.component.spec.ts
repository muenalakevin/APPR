import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregacionRapidaComponent } from './agregacion-rapida.component';

describe('AgregacionRapidaComponent', () => {
  let component: AgregacionRapidaComponent;
  let fixture: ComponentFixture<AgregacionRapidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregacionRapidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregacionRapidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
