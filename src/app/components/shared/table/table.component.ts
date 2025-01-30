import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: { key: string, header: string }[] = [];
  @Input() actions: { label: string, action: string, class?: string }[] = [];
  @Output() actionClick = new EventEmitter<{ action: string, row: any }>();
  @Input() nome: string = 'Nome da Tabela';

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = [...this.columns.map(c => c.key)];
    if (this.actions.length > 0) {
      this.displayedColumns.push('actions');
    }

    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource = new MatTableDataSource(this.data);
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

  onActionClick(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }

    applyFilter(event: Event): void {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
}