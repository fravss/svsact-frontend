import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { FormComponent } from '../../shared/form/form.component';
import { Usuario } from '../../../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [FormComponent],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent implements OnInit{
  formConfig: any[] = [];

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formConfig = [
          { name: 'email', label: 'Email', type: 'text', validators: [Validators.required] },
          { name: 'senha', label: 'Senha', type: 'password', validators: [Validators.required] },
        ];
  }
  async onSubmit(formValue: Usuario): Promise<void> {
    try {
        await this.autenticacaoService.login(formValue);
        this.router.navigate(['/denuncias']);
    
    } catch (error: any) {
      console.error('Erro ao enviar dados:', error.error.message);
    }
  }

}
