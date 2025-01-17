import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../../services/denuncia.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Denuncia } from '../../interfaces/denuncia';



@Component({
  selector: 'lista-denuncia',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './lista-denuncia.component.html',
  styleUrls: ['./lista-denuncia.component.css']
})
export class ListaDenunciaComponent implements OnInit {

  denunciaData: Denuncia[] = [];

  constructor(private denunciaService: DenunciaService) { }
  
  displayedColumns: string[] = ['Codigo', 'Relato', 'Conselheiro', 'Pessoa'];
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
