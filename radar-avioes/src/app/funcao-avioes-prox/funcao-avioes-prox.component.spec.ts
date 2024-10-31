import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoAvioesProxComponent } from './funcao-avioes-prox.component';

describe('FuncaoAvioesProxComponent', () => {
  let component: FuncaoAvioesProxComponent;
  let fixture: ComponentFixture<FuncaoAvioesProxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoAvioesProxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoAvioesProxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
