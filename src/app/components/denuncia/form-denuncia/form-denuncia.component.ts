import { Component,  OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DenunciaService } from '../../../services/denuncia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusRD } from '../../../interfaces/enums/StatusRD';
import { FormComponent } from '../../shared/form/form.component';

@Component({
  selector: 'app-form-denuncia',
  imports:  [FormComponent],
  templateUrl: './form-denuncia.component.html',
  styleUrl: './form-denuncia.component.scss',
})
export class FormDenunciaComponent  implements OnInit {
  formConfig: any[] = [];
  denunciaId?: number;
  editValues? = {};

  constructor(
    private denunciaService: DenunciaService,
    private router: Router,
    private route: ActivatedRoute,
   
  ) {}

 async ngOnInit(): Promise<void> {   
  this.formConfig = [
    { name: 'responsaveis', label: 'Responsáveis', type: 'text', validators: [Validators.required] },
    { name: 'criancasAdolescentes', label: 'Crianças ou Adolescentes Envolvidos', type: 'text', validators: [Validators.required] },
    { name: 'relato', label: 'Relato', type: 'textarea', validators: [Validators.required] },
    { name: 'medidasAplicadas', label: 'Medidas Aplicadas', type: 'text', validators: [Validators.required] },
    { name: 'dataEmissao', label: 'Data de Emissão', type: 'date', validators: [Validators.required] },
    { name: 'origemDenuncia', label: 'Origem Denúncia', type: 'select', options: [], validators: [Validators.required] },
    { name: 'statusRD', label: 'Status', type: 'select', options: Object.values(StatusRD).map(status => ({ value: status, label: status })), validators: [Validators.required] }
  ];
    try {
  
      this.denunciaId = Number(this.route.snapshot.paramMap.get('id'));
      if (this.denunciaId) {
        const denunciaData = await this.denunciaService.getDenunciaById(this.denunciaId);
        this.formConfig = this.formConfig.map(field => ({
          ...field,
          value: denunciaData[field.name] || field.value
        }));
       }
      const origemDenunciaData = await this.denunciaService.getOrigemDenuncias();
      const origemDenunciaField = this.formConfig.find(field => field.name === 'origemDenuncia');
      if (origemDenunciaField) {
        origemDenunciaField.options = origemDenunciaData.map(origem => ({ value: origem, label: origem }));
      }
     
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  async onSubmit(formValue: any): Promise<void> {
    try {
      if (this.denunciaId) {
        await this.denunciaService.updateDenuncia(formValue, this.denunciaId);
      } else {
        await this.denunciaService.addDenuncia(formValue);
      }
      this.router.navigate(['/denuncias']);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  }
}