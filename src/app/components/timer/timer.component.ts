import { Component } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ClockComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {}
