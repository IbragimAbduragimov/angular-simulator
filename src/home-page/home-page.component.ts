import { Component } from '@angular/core';
import { IBlog } from '../app/interfaces/IBlog';
import { IDirection } from '../app/interfaces/IDirection';
import { IAdvantage } from '../app/interfaces/IAdvantag';
import { IParticipant } from '../app/interfaces/IParticipant';
import { ILocation } from '../app/interfaces/ILocation';
import { Widget } from '../Widget';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  
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
  currentWidget: Widget = 'data';
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
  
    directions: IDirection[] = [
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
