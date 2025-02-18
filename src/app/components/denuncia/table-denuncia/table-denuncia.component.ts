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

  denuncias: Denuncia[] = []; 

  colunas = [
    { key: 'relato', nome: 'Relato' },
    { key: 'conselheiroNome', nome: 'Criador' },
    { key: 'statusRD', nome: 'Status' },
    { key: 'data', nome: 'Data' }
  ];

  acoes = [
    { label: 'Editar', acao: 'editar', icon: "edit"},
    { label: 'Deletar', acao: 'deletar', icon:"delete" }
  ];


 ngOnInit(): void {
    this.getDenuncia();    
  }

  async getDenuncia(): Promise<void> {
    try {
      const data: Denuncia[] = await this.denunciaService.getDenuncias();

      this.denuncias = data.map(denuncia => ({
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
      this.denuncias = this.denuncias.filter(denuncia => denuncia.id !== id);
      this.toastService.callSuccessToast('Denuncia deletada com sucesso!')
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }

  alterarDenuncia(id: number): void {
    this.router.navigate([`denuncia/${id}`]);
  }

  onDenunciaEvent(event: { acao: string, linha: any }): void {
    if (event.acao === 'editar') {
      this.alterarDenuncia(event.linha.id);
    } else if (event.acao === 'deletar') {
      this.deleteDenuncia(event.linha.id);
    }
  }
}
