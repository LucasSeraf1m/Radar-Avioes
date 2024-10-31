import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoRotacionarComponent } from './funcao-rotacionar.component';

describe('FuncaoRotacionarComponent', () => {
  let component: FuncaoRotacionarComponent;
  let fixture: ComponentFixture<FuncaoRotacionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoRotacionarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoRotacionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
