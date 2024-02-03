import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClockComponent } from '../clock/clock.component';
import { WorkStatusComponent } from '../work-status/work-status.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkStatusComponent,
    ClockComponent,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  private fb = inject(FormBuilder);
  public isOpen: boolean = false;
  public workTime: number = 0;
  public breakTime: number = 0;
  public workStatus: boolean = true;

  public myForm: FormGroup = this.fb.group({
    workTime: [0, [Validators.required, Validators.min(1)]],
    breakTime: [0, [Validators.required, Validators.min(1)]],
  });
  public getWorkStatus(workStatus: boolean): void {
    this.workStatus = workStatus;
  }

  public openForm() {
    this.isOpen = !this.isOpen;
  }

  public closeForm() {
    this.isOpen = !this.isOpen;
  }

  isValiedField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFielError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'The camp is required';
        case 'min':
          return `Minimun ${errors['min'].min} minutes`;
      }
    }
    return null;
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.workTime = this.myForm.controls['workTime'].value;
    this.breakTime = this.myForm.controls['breakTime'].value;
    this.myForm.reset();
    this.isOpen = false;
  }
}
