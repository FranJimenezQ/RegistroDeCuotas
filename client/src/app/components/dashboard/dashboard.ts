import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Verify } from 'crypto';
import { Init } from 'v8';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{

  public userRole: string = '';
  public groupName: string = '';
  public userName: string = '';
  public searchTerm: string = '';
  private router = inject(Router)
  public totalAnual: number = 0;
  public payments: number = 0;
  public students: number = 0;

  ngOnInit(){
    this.userRole = 'treasurer';
    this.groupName = 'Grupo 1';
    this.userName = 'Francisco';
    this.totalAnual = 2456.99
    this.payments = 15;
    this.students = 28;
  }

  onLogout(){
    this.router.navigate(['/login'])
  }

  onOpenPaymentModal(){
    console.log('opening modal')
  }

  onSearch(event: Event){
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
  }

}
