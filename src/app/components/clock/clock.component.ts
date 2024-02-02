import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'clock-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent {
  @Input() timeMinutes?: number = 50;

  public progres: number = 0;

  ngOnInit() {
    if (this.timeMinutes !== undefined) {
      this.progres = this.calculateProgressCircle2(this.timeMinutes);
    }
  }

  public calculateProgressCircle2(rating: number): number {
    const progressCap = rating * 60;
    // return (rating * progressCap) / 10;
    return progressCap / 1;
  }
}
