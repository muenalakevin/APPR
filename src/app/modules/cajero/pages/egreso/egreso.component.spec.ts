/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EgresoComponent } from './egreso.component';

describe('EgresoComponent', () => {
  let component: EgresoComponent;
  let fixture: ComponentFixture<EgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
