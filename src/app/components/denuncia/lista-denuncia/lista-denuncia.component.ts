import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../../../services/denuncia.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Denuncia } from '../../../interfaces/denuncia';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';



@Component({
  selector: 'lista-denuncia',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatButtonModule, MatButton],
  templateUrl: './lista-denuncia.component.html',
  styleUrls: ['./lista-denuncia.component.css'],
})
export class ListaDenunciaComponent implements OnInit {

  denunciaData: Denuncia[] = [];

  constructor(private denunciaService: DenunciaService, private router: Router) { }
  
  displayedColumns: string[] = ['Codigo', 'Relato', 'Conselheiro', 'Pessoa', 'Acoes'];
  dataSource = new MatTableDataSource<Denuncia>(this.denunciaData);

  ngOnInit(): void {
    this.getDenuncia();
  }

  getDenuncia(): void {
    this.denunciaService.getDenuncia().subscribe(
      (data: Denuncia[]) => {
        this.denunciaData = data;
        this.dataSource.data = data;
      }
    );
  }

  deleteDenuncia(id: number): void {
    this.denunciaService.deleteDenuncia(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(denuncia => denuncia.id !== id);
        console.log('Recurso deletado com sucesso');
      },
      error: err => {
        console.error('Erro ao deletar o recurso:', err);
      }
    });
  }
  
  navigateToNovaDenuncia() {
    this.router.navigate(['criar-denuncia']);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
