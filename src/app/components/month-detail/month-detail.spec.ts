import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDetail } from './month-detail';

describe('MonthDetail', () => {
  let component: MonthDetail;
  let fixture: ComponentFixture<MonthDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
