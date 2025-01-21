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


@Component({
  selector: 'app-formulario-denuncia',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDialogModule],
  templateUrl: './formulario-denuncia.component.html',
  styleUrl: './formulario-denuncia.component.css'
})
export class FormularioDenunciaComponent implements OnInit{
  denunciaForm: FormGroup;
  origemDenuncias: string[] = [];

  direitosVioladosEnum: string[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private denunciaService: DenunciaService, private router: Router) {
    this.denunciaForm = this.fb.group({
      relato: ['', Validators.required],
      pessoaId: [null, Validators.required],
      origem: ['', Validators.required],
      direitosViolados: ['', Validators.required]

    });
  }
  ngOnInit(): void {
    this.denunciaService.getOrigemDenuncias().subscribe(data => {
      this.origemDenuncias = data;
    });

    this.denunciaService.getDireitosViolados().subscribe(data => {
      this.direitosVioladosEnum = data;
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
        
      });
      this.router.navigate(['/denuncias']);
    }
  }

  

}
