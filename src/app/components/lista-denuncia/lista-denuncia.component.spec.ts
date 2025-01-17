import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDenunciaComponent } from './lista-denuncia.component';

describe('ListaDenunciaComponent', () => {
  let component: ListaDenunciaComponent;
  let fixture: ComponentFixture<ListaDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDenunciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
