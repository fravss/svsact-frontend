import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DenunciaService } from '../../../services/denuncia.service';
import { CriarDenuncia } from '../../../interfaces/denuncia';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { StatusRD } from '../../../interfaces/enums/StatusRD';
import { LogoutButtonComponent } from '../../autenticacao/logout-button/logout-button.component';

@Component({
  selector: 'app-formulario-denuncia',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDialogModule, MatDatepickerModule, LogoutButtonComponent],
  templateUrl: './formulario-denuncia.component.html',
  styleUrl: './formulario-denuncia.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioDenunciaComponent implements OnInit{
  denunciaForm: FormGroup;
  origemDenunciasEnum: string[] = [];
  statusRD: string[] = Object.values(StatusRD);
  direitosVioladosEnum: string[] = [];
  agenteVioladorEnum: string[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private denunciaService: DenunciaService, private router: Router) {
    this.denunciaForm = this.fb.group({
      relato: ['', Validators.required],
      dataEmissao:  ['', Validators.required],
      statusRD: ['', Validators.required],
      agenteViolador:['', Validators.required],
      origemDenuncia: ['', Validators.required],
      direitosViolados: ['', Validators.required]

    });
  }
  ngOnInit(): void {
    this.denunciaService.getOrigemDenuncias().subscribe(data => {
      this.origemDenunciasEnum = data;
    });

    this.denunciaService.getDireitosViolados().subscribe(data => {
      this.direitosVioladosEnum = data;
    });

    this.denunciaService.getAgenteViolador().subscribe(data => {
      this.agenteVioladorEnum = data;
    });
  }

  onDireitoChange(event: any): void {
    console.log('Origem da denúncia selecionada:', event.value);
  }
 onSubmit(): void {
    if (this.denunciaForm.valid) {
      const novaDenuncia: CriarDenuncia = this.denunciaForm.value;
       this.denunciaService.addDenuncia(novaDenuncia).subscribe(response => {
        console.log('Denúncia criada com sucesso:', response);
        this.router.navigate(['/denuncias']);
        
      });
      
    }
  }

  

}
