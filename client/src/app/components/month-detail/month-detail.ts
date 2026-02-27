import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-detail',
  imports: [],
  templateUrl: './month-detail.html',
  styleUrl: './month-detail.scss',
})
export class MonthDetail implements OnInit {


  public monthName: string = ''
  public monthNumber: number = 0
  public userRole: string = ''

  ngOnInit() {
    this.monthName = 'Enero';
    this.monthNumber = 1;
    this.userRole = 'treasurer';
  }

  onBack() {
    window.history.back();
  }

  onOpenPaymentModal(){
    console.log('opening modal')
  }
}
