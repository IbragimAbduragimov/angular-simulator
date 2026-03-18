import { Component, inject } from '@angular/core';
import './training.ts';
import { IAdvantage } from './interfaces/IAdvantag.js';
import { FormsModule } from '@angular/forms';
import { ILocation } from './interfaces/ILocation.js';
import { IParticipant } from './interfaces/IParticipant.js'
import { NgTemplateOutlet } from '@angular/common';
import { IWidget, Widget } from './interfaces/Widget.js';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  companyName: string = 'Румтибет';
  selectedAdvantagId?: number;
  selectedLocation!: boolean;
  selectedParticipant!: boolean;
  selectedDate!: boolean;
  clicker: number = 0;
  readonly zero: number = 0;
  dataText!: string | number;
  private data!: Date;
  liveInput!: string | number;
  isLoading: boolean = false;
  underline: boolean = false;
  selectedUnderline!: number;
  currentWidget: IWidget = 'clicker';
  


  locations: ILocation[] = [
    {
      id: 1,
      name: 'dagestan'
    },
    {
      id: 2,
      name: 'moscow'
    }
  ]

  participants: IParticipant[] = [
    {
      id: 1,
      quantity: 'участники',
    },
    {
      id: 2,
      quantity: 'участник 1',
    },
    {
      id: 3,
      quantity: 'участник 2',
    }
  ]


  advantages: IAdvantage[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.plus();
    this.dataText;
    this.data;
    this.clicker = 0;

    setInterval(() => {
      this.data = new Date();
      this.dataText = this.data.toString();
    }, 1000);
  
  
    setInterval(() => {
      this.isLoading = true;
    }, 2000);
  }
  saveLastVisitDate(): void {
    const date: Date = new Date();
    const dateString: string = date.toString();
    localStorage.setItem('date', dateString);
  }

  saveVisitCount(): void {
  const currentCount: string | null = localStorage.getItem('visit-count');
  
  let newCount: number;
  
  if (currentCount) {
    newCount = Number(currentCount) + 1;
  } else {
    newCount = 1;
  }

  localStorage.setItem('visit-count', newCount.toString());
 }

  selectService(advantagId: number): void {
      this.selectedAdvantagId = advantagId;
    }

  plus() {
    this.clicker += 1;
  }

  minus(): void {
    if (this.clicker > 0) {
      this.clicker -= 1;
    }
  }

  isValidForm(): boolean {
    return this.selectedLocation && this.selectedParticipant && this.selectedDate;
  }

  toggleWidget(widget: Widget) {
    this.currentWidget = widget;
  }

  
}
