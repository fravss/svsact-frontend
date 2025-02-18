import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIcon, MatTooltipModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() informacoes: any[] = [];
  @Input() colunas: { key: string, nome: string }[] = [];
  @Input() acoes: { label: string, acao: string,  icon?: string }[] = [];
  @Output() acaoClick = new EventEmitter<{ acao: string, linha: any }>();

  @Input() nomeDaTabela: string = '';
  

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = [...this.colunas.map(c => c.key)];
    if (this.acoes.length > 0) {
      this.displayedColumns.push('acoes');
    }

    this.dataSource = new MatTableDataSource(this.informacoes);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['informacoes'] && changes['informacoes'].currentValue) {
      this.dataSource = new MatTableDataSource(this.informacoes);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onClick(acao: string, linha: any) {
    this.acaoClick.emit({ acao, linha });
  }

    applyFilter(event: Event): void {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
}