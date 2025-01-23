import { Component } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioLogin } from '../../interfaces/usuario';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule,
 CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor(private autenticacaoService: AutenticacaoService, private fb: FormBuilder, private router: Router){
    this.loginForm = this.fb.group({
          email: ['', Validators.required],
          senha:  ['', Validators.required],        
        });
  }

   login(): void {
      if (this.loginForm.valid) {
        const usuario: UsuarioLogin = this.loginForm.value;
        this.autenticacaoService.login(usuario).subscribe(response => {
          console.log('Logado:', response);
          
        });
        this.router.navigate(['']);
      }
    }

}
