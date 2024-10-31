import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoEscalonarComponent } from './funcao-escalonar.component';

describe('FuncaoEscalonarComponent', () => {
  let component: FuncaoEscalonarComponent;
  let fixture: ComponentFixture<FuncaoEscalonarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoEscalonarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoEscalonarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
