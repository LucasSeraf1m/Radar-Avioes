import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoAvioesProxAeropComponent } from './funcao-avioes-prox-aerop.component';

describe('FuncaoAvioesProxAeropComponent', () => {
  let component: FuncaoAvioesProxAeropComponent;
  let fixture: ComponentFixture<FuncaoAvioesProxAeropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoAvioesProxAeropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoAvioesProxAeropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
