import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoTranslandarComponent } from './funcao-translandar.component';

describe('FuncaoTranslandarComponent', () => {
  let component: FuncaoTranslandarComponent;
  let fixture: ComponentFixture<FuncaoTranslandarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoTranslandarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncaoTranslandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
