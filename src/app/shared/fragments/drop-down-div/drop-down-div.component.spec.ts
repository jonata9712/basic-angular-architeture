import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownDivComponent } from './drop-down-div.component';

describe('DropDownDivComponent', () => {
  let component: DropDownDivComponent;
  let fixture: ComponentFixture<DropDownDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
