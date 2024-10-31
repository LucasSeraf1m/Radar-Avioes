import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoRotaColisaoComponent } from './funcao-rota-colisao.component';

describe('FuncaoRotaColisaoComponent', () => {
  let component: FuncaoRotaColisaoComponent;
  let fixture: ComponentFixture<FuncaoRotaColisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoRotaColisaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoRotaColisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
