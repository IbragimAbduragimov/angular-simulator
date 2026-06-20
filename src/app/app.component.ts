import { Component, inject } from '@angular/core';
import { IAdvantage } from './interfaces/IAdvantag.js';
import { FormsModule } from '@angular/forms'; 
import { ILocation } from './interfaces/ILocation.js';
import { IParticipant } from './interfaces/IParticipant.js';
import { IDirection } from './interfaces/IDirection.js'; 
import { IBlog } from './interfaces/IBlog.js';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Message } from '../enums/Message.js'; 
import { MessageService } from '../message.service.js';
import { Widget } from './types/Widget.js';
import { FooterComponent } from "./footer/footer.component.js";
import { HeaderComponent } from "./header/header.component.js";
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./loader/loader.component";
import { MessageComponent } from "./message/message.component";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersPageComponent } from "./users-page/users-page.component.js";
import { ThemeService } from './theme.service.js';
@Component({ 
  selector: 'app-root',
  imports: [FormsModule, FooterComponent, HeaderComponent, RouterOutlet, LoaderComponent, MessageComponent,],
  templateUrl: 'app.component.html', 
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent { 

  companyName: string = 'Румтибет'; 
  selectedAdvantagId!: number;
  selectedLocation!: boolean;
  selectedParticipant!: boolean; 
  selectedDate!: boolean;
  clicker: number = 0; 
  liveInput!: string; 
  isLoading: boolean = false;
  currentWidget: string = 'data';
  selectedUnderline!: number;
  message: typeof Message  = Message;
  dateText!: string;


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
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации  соответствующих условий активизации.'
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

  constructor() { 
    this.saveLastVisitDate(); 
    this.saveVisitCount();


    setInterval(() => {
      this.dateText = new Date().toString();
    }, 1000); 
  
   
    setInterval(() => {
      this.isLoading = true; 
    }, 2000);
  }
  saveLastVisitDate(): void {
    const dateString: string = new Date().toString();
    localStorage.setItem('date', dateString);
  }
 
  saveVisitCount(): void {
    const currentCount: string | null = localStorage.getItem('visit-count');
      
    let newCount: number; 

    currentCount? newCount = Number(currentCount) + 1 : newCount = 1;

    localStorage.setItem('visit-count', newCount.toString());
  }

  selectService(advantagId: number): void { 
    this.selectedAdvantagId = advantagId;
  }
 
  increment(): void {
    this.clicker + 1;
  }

  decrement(): void {
    if (this.clicker > 0) {  
      this.clicker - 1;
    }
  }

  isValidForm(): boolean {
    return this.selectedLocation && this.selectedParticipant && this.selectedDate; 
  }

  toggleWidget(widget: Widget) {
    this.currentWidget = widget;
  } 

}