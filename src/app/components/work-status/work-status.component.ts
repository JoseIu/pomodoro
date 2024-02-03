import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatusBreakComponent } from '../status-break/status-break.component';
import { StatusFocusComponent } from '../status-focus/status-focus.component';

@Component({
  selector: 'work-status',
  standalone: true,
  imports: [StatusBreakComponent, StatusFocusComponent],
  templateUrl: './work-status.component.html',
  styleUrl: './work-status.component.scss',
})
export class WorkStatusComponent implements OnChanges {
  @Input() public workStatus: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Status', changes);
  }
}
