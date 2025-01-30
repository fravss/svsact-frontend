import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../../../services/denuncia.service';
import { Denuncia } from '../../../interfaces/denuncia';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';



@Component({
  selector: 'lista-denuncia',
  imports: [TableComponent,  NavbarComponent],
  templateUrl: './table-denuncia.component.html',
  styleUrls: ['./table-denuncia.component.scss'],
  providers:[DatePipe]
})
export class TableDenunciaComponent implements  OnInit{
  
  constructor(private denunciaService: DenunciaService, private router: Router, private datePipe: DatePipe) { }
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


  onTableAction(event: { action: string, row: any }) {
    if (event.action === 'edit') {
      console.log('Edit row:', event.row.id);
      this.alterarDenuncia(event.row.id)
    } else if (event.action === 'delete') {
      console.log('Delete row:', event.row.id);
      this.deleteDenuncia(event.row.id)
    }
  }

  ngOnInit(): void {
    this.getDenuncia();
    

 }


 async getDenuncia(): Promise<void> {
   (await this.denunciaService.getDenuncia()).subscribe({
     next: (data: Denuncia[]) => {
       this.denunciaData = data.map(denuncia => ({
         ...denuncia,
         data: this.datePipe.transform(denuncia.dataEmissao, 'dd/MM/yyyy'),
         conselheiroNome: denuncia.conselheiro.nome 
       }));
     },
     error: err => console.error('Error fetching data:', err),
   });
 }
  deleteDenuncia(id: number): void {
    this.denunciaService.deleteDenuncia(id).subscribe({
     next: () => {
       this.denunciaData = this.denunciaData.filter(denuncia => denuncia.id !== id);
       
     },
     error: err => {
       console.error('Erro ao deletar o recurso:', err);
     }
   });
 }

 alterarDenuncia(id: number): void {
   this.router.navigate([`denuncia/${id}`]);
}

}
