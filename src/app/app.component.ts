import { Component, inject } from '@angular/core';
import './training.ts';
import { IAdvantage } from './interfaces/IAdvantag.js';
import { FormsModule } from '@angular/forms';
import { ILocation } from './interfaces/ILocation.js';
import { IParticipant } from './interfaces/IParticipant.js';
import { IDirection } from './interfaces/IDirection.js';
import { IBlog } from './interfaces/IBlog.js';
import { NgTemplateOutlet } from '@angular/common';
import { Condition } from '../enums/Сondition.js';
import { MessageService } from '../message.service.js';
import { ICondition } from './interfaces/ICondition.js';
import { IbBusinessServices } from './interfaces/IBusinessServices.js';
import { IImportant } from './interfaces/IImportant.js';
import { Widget } from './types/widget.js';
@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {

  MessageService: MessageService = inject(MessageService);

  currentCondition? = Condition;
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
  currentWidget = 'data';
  underline: boolean = false;
  selectedUnderline!: number;


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

  directions: IDirection [] = [
    {
      image: 'lake-bg',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      estimation: 4.9
    },
    {
      image: 'night-mountains-bg',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      estimation: 4.5
    },
    {
      image: 'stretching-bg',
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      price: 230,
      estimation: 5.0
    },
  ]

  blogs: IBlog[] = [
    {
      id: 1,
      image: 'italia',
      title: 'Красивая Италя, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      image: 'plane',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...'
    },
    {
      id: 3,
      image: 'street',
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.'
    },
    {
      id: 4,
      image: 'India',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.'
    },
  ]

  constructor(MessageService: MessageService) {
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


  //18homework

  businessServices: IbBusinessServices[] = [
    {
      service: 'Прогулки в горы летом'
    },
        {
      service: 'Зимние походы в горы'
    },
        {
      service: 'Посещение мест в горах'
    },
        {
      service: 'Экстремальные виды туризма'
    },
        {
      service: 'Походы в джунглях Амазонии'
    },
        {
      service: 'Поездка в Африку'
    },
  ]

  importants: IImportant[] = [
    {
      important: 'Как собрать в долгий поход?'
    },
        {
      important: 'Жизненно важные предметы для похода'
    },
        {
      important: 'Медицинская страховка, гарантии безопасности'
    },
        {
      important: 'Если вы врач - загляните сюда'
    }
  ]
  
}
