import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaSelectComponent } from './busca-select.component';

describe('BuscaSelectComponent', () => {
  let component: BuscaSelectComponent;
  let fixture: ComponentFixture<BuscaSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
