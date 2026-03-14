import { Component } from '@angular/core';
import './training.ts';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  companyName: string = 'Румтибет';

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  saveLastVisitDate(): void {
    const date = new Date();
    const dateString = date.toString();
    localStorage.setItem('date', dateString);
  }


  saveVisitCount(): void {
  const currentCount = localStorage.getItem('visitCount');
  
  let newCount: number;
  
  if (currentCount) {
    newCount = Number(currentCount) + 1;
  } else {
    newCount = 1;
  }

  localStorage.setItem('visitCount', newCount.toString());
 }
}

