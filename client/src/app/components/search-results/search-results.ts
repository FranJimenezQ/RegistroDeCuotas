import { Component, computed, Signal, Input, OnChanges, SimpleChanges } from '@angular/core';
import { mockStudents, mockPayments, mockGroups } from '../../mockData/mockData';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-search-results',
  imports: [DecimalPipe],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults implements OnChanges {

  constructor() { }

  // must recive searchTerm from parent
  @Input() searchTerm: string = '';

  // must recive students from mockData
  students: any[] = mockStudents;

  // must recive payments from mockData
  payments: any[] = mockPayments;

  // must recive groups from mockData
  groups: any[] = mockGroups;

  // must filter the searTerm in the students array
  filteredStudents: any[] = [];

  // must get the payment of the filtered student
  filteredPayments: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredPayments = this.filteredStudents.length > 0
        ? this.payments.filter(payment =>
            this.filteredStudents.some(student => student.id === payment.studentId)
          )
        : [];
    }
  }
  public studentDetails = computed(() => {
    return this.filteredStudents.map(student => {
      const studentPayments = this.filteredPayments.filter(payment => payment.studentId === student.id);
      return {
        id: student.id,
        name: student.name,
        groupId: student.groupId,
        parentEmail: student.parentEmail,
        totalPaid: studentPayments.reduce((sum, payment) => sum + payment.amount, 0),
        paidCount: studentPayments.filter(payment => payment.status === 'paid').length,
        overdueCount: studentPayments.filter(payment => payment.status === 'overdue').length
      } 
    })

  })

}
