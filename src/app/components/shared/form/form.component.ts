import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form',
  imports:[ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule, MatSelectModule,
      MatOptionModule, CommonModule, MatDatepickerModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
    providers: [provideNativeDateAdapter()],

})
export class FormComponent implements  OnChanges {
  @Input() formConfig: any[] = [];
  @Input() submitCallback!: (formValue: any) => void;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formConfig'] && changes['formConfig'].currentValue) {
      this.initForm();
    }
  }

  private initForm(): void {
    const formGroupConfig = this.formConfig.reduce((config, field) => {
      config[field.name] = [field.value || '', field.validators || []];

      return config;
    }, {});
    this.form = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitCallback(this.form.value);
    }
  }
}