import { Component, computed, signal } from '@angular/core';
import { Payment } from '../../interfaces/interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-monthly-resume',
  imports: [DecimalPipe],
  templateUrl: './monthly-resume.html',
  styleUrl: './monthly-resume.scss',
})
export class MonthlyResume {

  public months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public payments = signal<Payment[]>([
    { studentId: '1', month: 1, amount: 150.00, status: 'paid', groupId: 'group1' },
    { studentId: '2', month: 1, amount: 150.00, status: 'paid', groupId: 'group1' },
    { studentId: '3', month: 1, amount: 0.00, status: 'overdue', groupId: 'group1' },
    { studentId: '1', month: 2, amount: 150.00, status: 'paid', groupId: 'group1' },
    { studentId: '2', month: 2, amount: 0.00, status: 'overdue', groupId: 'group1' },
    { studentId: '4', month: 2, amount: 150.00, status: 'paid', groupId: 'group1' },
    { studentId: '1', month: 3, amount: 150.00, status: 'paid', groupId: 'group1' },
    { studentId: '3', month: 3, amount: 150.00, status: 'paid', groupId: 'group1' },
    { studentId: '5', month: 3, amount: 150.00, status: 'paid', groupId: 'group1' },
  ]);

  public monthlyTotals = computed(() =>
    this.months.map((month, index) => {
      const monthPayments = this.payments().filter(p => p.month === index + 1);
      const total = monthPayments.reduce((sum, p) => sum + p.amount, 0);
      const paidCount = monthPayments.filter(p => p.status === 'paid').length;
      const overdueCount = monthPayments.filter(p => p.status === 'overdue').length;
      return { month, monthNumber: index + 1, total, paidCount, overdueCount };
    })
  );

  onNavigateToMonth(monthNumber: number) {
    console.log('navigate to month', monthNumber);
  }

}
