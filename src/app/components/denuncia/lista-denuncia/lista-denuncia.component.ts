import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DenunciaService } from '../../../services/denuncia.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Denuncia } from '../../../interfaces/denuncia';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LogoutButtonComponent } from '../../autenticacao/logout-button/logout-button.component';



@Component({
  selector: 'lista-denuncia',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatButtonModule, MatButton, MatPaginatorModule, LogoutButtonComponent],
  templateUrl: './lista-denuncia.component.html',
  styleUrls: ['./lista-denuncia.component.css'],
})
export class ListaDenunciaComponent implements OnInit, AfterViewInit {

  denunciaData: Denuncia[] = [];

  constructor(private denunciaService: DenunciaService, private router: Router) { }
  
  displayedColumns: string[] = ['Relato', 'Status','Data', 'Acoes'];
  dataSource = new MatTableDataSource<Denuncia>(([]));
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
     this.getDenuncia();

  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  getDenuncia(): void {
    this.denunciaService.getDenuncia().subscribe({
      next: (data: Denuncia[]) => {
        this.denunciaData = data.map(denuncia => ({
          ...denuncia,
          dataEmissao: new Date(denuncia.dataEmissao),
        }));
        this.dataSource.data = this.denunciaData;
      },
      error: err => console.error('Error fetching data:', err),
    });
  }


  deleteDenuncia(id: number): void {
    this.denunciaService.deleteDenuncia(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(denuncia => denuncia.id !== id);
        
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
