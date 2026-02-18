import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { MatIconModule } from '@angular/material/icon'

interface Groups {
  id?: string;
  name: string;
  description?: string;
}
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    //MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);

  public groups: Groups[] = [
    { id: '1', name: 'Grupo 1', description: 'Descripción del Grupo 1' },
    { id: '2', name: 'Grupo 2', description: 'Descripción del Grupo 2' },
    { id: '3', name: 'Grupo 3', description: 'Descripción del Grupo 3' }
  ];

  constructor(

  ) {}

  ngOnInit() {



  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }


  onSubmit() {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log('Formulario de inicio de sesión enviado');
    this.navigateToDashboard();
  }
}
