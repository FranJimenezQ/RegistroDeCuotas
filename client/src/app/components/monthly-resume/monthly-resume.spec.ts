import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyResume } from './monthly-resume';

describe('MonthlyResume', () => {
  let component: MonthlyResume;
  let fixture: ComponentFixture<MonthlyResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyResume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyResume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
