import { Component } from '@angular/core';
import { Widget } from '../app/types/Widget';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'Румтибет'; 
  currentWidget: string = 'data';
  clicker!: number;
  dateText!: string;

  toggleWidget(widget: Widget) {
    this.currentWidget = widget;
  } 

  increment(): void {
    this.clicker + 1;
  }

  decrement(): void {
    if (this.clicker > 0) {  
      this.clicker - 1;
    }
  }
}
