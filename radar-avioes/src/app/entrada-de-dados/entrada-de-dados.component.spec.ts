import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDeDadosComponent } from './entrada-de-dados.component';

describe('EntradaDeDadosComponent', () => {
  let component: EntradaDeDadosComponent;
  let fixture: ComponentFixture<EntradaDeDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaDeDadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaDeDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
