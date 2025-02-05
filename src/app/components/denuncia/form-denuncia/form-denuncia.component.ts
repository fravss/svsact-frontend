import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DenunciaService } from '../../../services/denuncia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusRD } from '../../../interfaces/enums/StatusRD';
import { FormComponent } from '../../shared/form/form.component';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-form-denuncia',
  imports: [FormComponent, NavbarComponent],
  templateUrl: './form-denuncia.component.html',
  styleUrl: './form-denuncia.component.scss',
  providers:[DatePipe]
})
export class FormDenunciaComponent implements OnInit {
  formConfig: any[] = [];
  denunciaId?: number;
  editValues? = {};

  constructor(
    private denunciaService: DenunciaService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastService: ToastService

  ) { }

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
      await this.populateOptions();

      this.denunciaId = Number(this.route.snapshot.paramMap.get('id'));
      if (this.denunciaId) {
        await this.onEdit(this.denunciaId);
      }
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }

  async onEdit(id: number): Promise<void> {
    const denunciaData = await this.denunciaService.getDenunciaById(id);
  
    this.formConfig = this.formConfig.map(field => ({
      ...field,
      value: field.type === 'date' ? this.datePipe.transform(denunciaData[field.name], 'yyyy-MM-dd')
        : denunciaData[field.name]
    }));
  }
  
  async populateOptions(): Promise<void> {
    const origemDenunciaData = await this.denunciaService.getOrigemDenuncias();
    const origemDenunciaField = this.formConfig.find(field => field.name === 'origemDenuncia');
    origemDenunciaField.options = origemDenunciaData.map(origem => ({ value: origem, label: origem }));
  }

  async onSubmit(formValue: any): Promise<void> {
    try {
      if (this.denunciaId) {
        await this.denunciaService.updateDenuncia(formValue, this.denunciaId);
      } else {
        await this.denunciaService.addDenuncia(formValue);
      }
      this.router.navigate(['/denuncias']);
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }
}