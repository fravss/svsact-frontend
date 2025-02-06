import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../../../services/denuncia.service';
import { Denuncia } from '../../../interfaces/denuncia';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ToastService } from '../../shared/toast/toast.service';



@Component({
  selector: 'lista-denuncia',
  imports: [TableComponent,  NavbarComponent],
  templateUrl: './table-denuncia.component.html',
  styleUrls: ['./table-denuncia.component.scss'],
  providers:[DatePipe]
})
export class TableDenunciaComponent implements  OnInit{
  
  constructor(
    private denunciaService: DenunciaService, 
    private router: Router, 
    private datePipe: DatePipe,
    private toastService: ToastService) { }

  denunciaData: Denuncia[] = []; 

  tableColumns = [
    { key: 'relato', header: 'Relato' },
    { key: 'conselheiroNome', header: 'Criador' },
    { key: 'statusRD', header: 'Status' },
    { key: 'data', header: 'Data' }
  ];

  tableActions = [
    { label: 'Editar', action: 'edit', class: 'btn-edit' },
    { label: 'Deletar', action: 'delete', class: 'btn-delete' }
  ];


 ngOnInit(): void {
    this.getDenuncia();    
  }

  async getDenuncia(): Promise<void> {
    try {
      const data: Denuncia[] = await this.denunciaService.getDenuncia();
      this.denunciaData = data.map(denuncia => ({
        ...denuncia,
        data: this.datePipe.transform(denuncia.dataEmissao, 'dd/MM/yyyy'),
        conselheiroNome: denuncia.conselheiro.nome
      }));
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }

  async deleteDenuncia(id: number): Promise<void> {
    try {
      await this.denunciaService.deleteDenuncia(id);
      this.denunciaData = this.denunciaData.filter(denuncia => denuncia.id !== id);
      this.toastService.callSuccessToast('Denuncia deletada com sucesso!')
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }

  alterarDenuncia(id: number): void {
    this.router.navigate([`denuncia/${id}`]);
  }

  onTableAction(event: { action: string, row: any }): void {
    if (event.action === 'edit') {
      this.alterarDenuncia(event.row.id);
    } else if (event.action === 'delete') {
      this.deleteDenuncia(event.row.id);
    }
  }
}
