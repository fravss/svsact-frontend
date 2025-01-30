import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDenunciaComponent } from './table-denuncia.component';

describe('ListaDenunciaComponent', () => {
  let component: TableDenunciaComponent;
  let fixture: ComponentFixture<TableDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDenunciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
