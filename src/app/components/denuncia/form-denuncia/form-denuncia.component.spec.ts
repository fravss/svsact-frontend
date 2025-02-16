import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDenunciaComponent } from './form-denuncia.component';

describe('FormDenunciaComponent', () => {
  let component: FormDenunciaComponent;
  let fixture: ComponentFixture<FormDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDenunciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
