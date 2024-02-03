import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ClockComponent, CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  public isOpen: boolean = false;
  public openForm() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  public closeForm() {
    this.isOpen = !this.isOpen;
  }
}
