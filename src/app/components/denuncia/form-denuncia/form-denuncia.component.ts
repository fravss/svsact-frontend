import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DenunciaService } from '../../../services/denuncia.service';
import { Denuncia } from '../../../interfaces/denuncia';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { StatusRD } from '../../../interfaces/enums/StatusRD';
import { LogoutButtonComponent } from '../../autenticacao/logout-button/logout-button.component';
import { first } from 'rxjs';


@Component({
  selector: 'app-form-denuncia',
  imports:  [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDatepickerModule, LogoutButtonComponent],
  templateUrl: './form-denuncia.component.html',
  styleUrl: './form-denuncia.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDenunciaComponent implements OnInit{
  denunciaForm: FormGroup;
  origemDenunciasEnum: string[] = [];
  statusRD: string[] = Object.values(StatusRD);
  denunciaId?: number;
 

  constructor(private fb: FormBuilder, private denunciaService: DenunciaService, private router: Router, private route: ActivatedRoute) {
    this.denunciaForm = this.fb.group({
      relato: ['', Validators.required],
      dataEmissao:  ['', Validators.required],
      statusRD: ['', Validators.required],
      origemDenuncia: ['', Validators.required],
      responsaveis: ['', Validators.required],
      criancasAdolescentes: ['', Validators.required],
      medidasAplicadas: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.denunciaService.getOrigemDenuncias().subscribe(data => {
      this.origemDenunciasEnum = data;
    });  

    this.denunciaId =  Number(this.router.url.split('/')[2]);
    if(this.denunciaId) {
      this.denunciaService.getDenunciaById(this.denunciaId).subscribe(response => {
        console.log('Denuncia encontrada:', response);
        this.denunciaForm.patchValue({
          relato: response.relato,
          dataEmissao: response.dataEmissao,
          statusRD: response.statusRD,
          origemDenuncia: response.origemDenuncia,
          responsaveis: response.responsaveis,
          criancasAdolescentes: response.criancasAdolescentes,
          medidasAplicadas: response.medidasAplicadas
        });
        
      });
      
    } else {
      console.log('nao tem id')
    }
  }


 onSubmit(): void {

    if (this.denunciaForm.valid && this.denunciaId) {
      const novaDenuncia: Denuncia = this.denunciaForm.value;
       this.denunciaService.updateDenuncia(novaDenuncia, this.denunciaId).subscribe(response => {
        console.log('Denúncia atualizada com sucesso:', response);
        this.router.navigate(['/denuncias']);
        
      });
      
    } else if (this.denunciaForm.valid){
      const novaDenuncia: Denuncia = this.denunciaForm.value;
       this.denunciaService.addDenuncia(novaDenuncia).subscribe(response => {
        console.log('Denúncia criada com sucesso:', response);
        this.router.navigate(['/denuncias']);
        
      });
    }
  }

  

}
