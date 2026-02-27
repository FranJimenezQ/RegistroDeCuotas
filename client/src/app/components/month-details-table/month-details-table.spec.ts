import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDetailsTable } from './month-details-table';

describe('MonthDetailsTable', () => {
  let component: MonthDetailsTable;
  let fixture: ComponentFixture<MonthDetailsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthDetailsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthDetailsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
